var canvasFunctions = require('../canvas/canvasFunctions');
var drawCircles = canvasFunctions.drawCircles;
var drawInitialCircles = canvasFunctions.drawInitialCircles;
var passNewOptions = canvasFunctions.getNewOptions;
var isCanvasDrawn = canvasFunctions.isCanvasDrawn;
var CanvasOptions = require('../canvas/CanvasOptions').CanvasOptions;
var minimizeVideo = require('../media/openCloseVideo').minimizeVideo;
var minimizePhoto = require('../media/openClosePhoto').minimizePhoto;
var DOM = require('../helpers/getDOMElements');
var menu = DOM.menu;
var darkBg = DOM.darkBg;
var closeMenu = require('../navigation/hamburgerMenu').closeMenu;

//will store timeout for debouncing
var timeout; 

//will store new canvas options
var resizeCanvasOptions;

function resizeHandler(){
    var windowWidth = window.innerWidth;
    
    //hide/show hamburger menu
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
    
    //minimize videos and photos
    for (i=0; i<2; i++) {
        minimizeVideo(i, windowWidth);
    }
    for (i=0; i<8; i++) {
        minimizePhoto(i, windowWidth);
    }
    
    //Check if canvas has been scrolled to and 
    //drawn - if that's the case, only options and initial 0% circles  
    //will be updated, else full redraw will be performed.
    clearTimeout(timeout); //debounce
    var canvasDrawn = isCanvasDrawn();
    if(!canvasDrawn) {
        timeout = setTimeout(function(){
            resizeCanvasOptions = new CanvasOptions(windowWidth);
            drawInitialCircles(resizeCanvasOptions);
            passNewOptions(resizeCanvasOptions);
        }, 500);
    }
    else {
        timeout = setTimeout(function(){
            drawCircles(new CanvasOptions(windowWidth)); 
        }, 500);
    }  
}

$(window).resize(resizeHandler);