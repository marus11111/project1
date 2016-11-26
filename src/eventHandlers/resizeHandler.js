var circles = require('../canvas/circles');
var drawCircles = circles.drawCircles;
var drawInitialCircles = circles.drawInitialCircles;
var passNewOptions = circles.getNewOptions;
var CanvasOptions = require('../canvas/CanvasOptions').CanvasOptions;
var minimizeVideo = require('../media/openCloseVideo').minimizeVideo;
var minimizePhoto = require('../media/openClosePhoto').minimizePhoto;
var DOM = require('../helpers/getDOMElements');
var menu = DOM.menu;
var darkBg = DOM.darkBg;

//will store timeout for debouncing purposes
var timeout; 

//will store new canvas options
var resizeCanvasOptions;

function resizeHandler(){
    var windowWidth = window.innerWidth;
    
    //resize hamburger menu
    darkBg.css('display', 'none');
    if (windowWidth >= 1070){
        menu.css({
            'display': 'block',
            'opacity': 1
        });
    }
    else {
        menu.css({
            'display': 'none',
            'opacity': 0
        });
    }
    
    //close videos and photos so that they resize properly
    for (i=0; i<2; i++) {
        minimizeVideo(i, windowWidth);
    }
    for (i=0; i<8; i++) {
        minimizePhoto(i, windowWidth);
    }
    
    clearTimeout(timeout);
    
    //Check if there is still scroll event attached to ducument.
    //If scroll is attached, then canvas wasn't yet scrolled to and 
    //drawn - only options and initial 0% circles will be updated.
    //If scroll isn't attached anymore, it means canvas was already drawn 
    //and full redraw will be performed.
    var documentEvents = $._data($(document)[0], 'events');
    if(documentEvents){
        if(documentEvents.scroll){
            timeout = setTimeout(function(){
                resizeCanvasOptions = new CanvasOptions(windowWidth);
                drawInitialCircles(resizeCanvasOptions);
                passNewOptions(resizeCanvasOptions);
            }, 500);
        }
    }
    else{
        timeout = setTimeout(function(){
            drawCircles(new CanvasOptions(windowWidth)); 
        }, 500);
    }  
}

$(window).resize(resizeHandler);