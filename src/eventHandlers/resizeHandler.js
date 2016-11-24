var resizeCanvas = require('../canvas/resizeCanvas').resizeCanvas;
var minimizeVideo = require('../media/openCloseVideo').minimizeVideo;
var minimizePhoto = require('../media/openClosePhoto').minimizePhoto;
var DOM = require('../helpers/getDOMElements');
var menu = DOM.menu;
var darkBg = DOM.darkBg;

var windowWidth = window.innerWidth;
var timeout; 

function resizeHandler(){
    windowWidth = window.innerWidth;
    darkBg.css('display', 'none');
    if (windowWidth >= 950){
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
    for (i=0; i<2; i++) {
        minimizeVideo(i, windowWidth);
    }
    for (i=0; i<8; i++) {
        minimizePhoto(i, windowWidth);
    }
    clearTimeout(timeout);
    timeout = setTimeout(function(){
        resizeCanvas(windowWidth); 
    }, 500);
    
}

$(window).resize(resizeHandler);

exports.windowWidth = windowWidth;