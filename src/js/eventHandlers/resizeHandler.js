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
var showHide = require('../helpers/showHide');
var show = showHide.show;
var hide = showHide.hide;
var menuBreakpoint = require('../navigation/hamburgerMenu').menuBreakpoint;

//will store timeout for debouncing
var timeout;

//will store info about window width to compare it to new window width;
//it is here so that resize handler may fire only when window width changes,
//which will prevent continous canvas redrawing when browser bar is being hidden 
// and shown on mobile devices 
var currentWindowWidth = window.innerWidth;

//will store new canvas options
var resizeCanvasOptions;

function resizeHandler() {
  var newWindowWidth = window.innerWidth;
  
  if(newWindowWidth !== currentWindowWidth) {
    
    //hide/show hamburger menu
    hide(darkBg);
    (newWindowWidth >= menuBreakpoint) ? show(menu): hide(menu);

    //minimize videos and photos
    for (i = 0; i < 2; i++) {
      minimizeVideo(i, newWindowWidth);
    }
    for (i = 0; i < 8; i++) {
      minimizePhoto(i, newWindowWidth);
    }

    //Check if canvas has been scrolled to and 
    //drawn - if that's the case, only options and initial 0% circles  
    //will be updated, else full redraw will be performed.
    clearTimeout(timeout); //debounce
    var canvasDrawn = isCanvasDrawn();
    if (!canvasDrawn) {
      timeout = setTimeout(function () {
        resizeCanvasOptions = new CanvasOptions(newWindowWidth);
        drawInitialCircles(resizeCanvasOptions);
        passNewOptions(resizeCanvasOptions);
      }, 500);
    } else {
      timeout = setTimeout(function () {
        drawCircles(new CanvasOptions(newWindowWidth));
      }, 500);
    }
    
    currentWindowWidth = newWindowWidth;
  }
}

$(window).resize(resizeHandler);
