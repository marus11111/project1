var DOM = require('../helpers/getDOMElements');
var videoButtons = DOM.videoButtons;
var darkBg = DOM.darkBg;
var closePopUp = DOM.closePopUp;
var mediaOptions = require('./mediaCSSOptions');
var openOptions = mediaOptions.mediaOpenOptions;
var closeOptions = mediaOptions.mediaCloseOptions;
var hideShowMenu = require('./popUp-hideShowMenu');
var showMenu = hideShowMenu.popUpShowMenu;
var hideMenu = hideShowMenu.popUpHideMenu;
var hideShowDark = require('./popUp-hideShowDarkBg');
var showDark = hideShowDark.popUpShowDark;
var hideDark = hideShowDark.popUpHideDark;

function enlargeVideo(videoIndex) {
    var button = videoButtons.eq(videoIndex);
    var videoWrapper = button.parent();
    var video = button.prev();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    video.attr('controls', true);
    
    hideMenu(windowWidth);
    showDark();
    
    button.fadeTo(0.5, 0);
    videoWrapper.css(openOptions);
    if (windowHeight>windowWidth){
        videoWrapper.css('width', 0.95*windowWidth+'px'); 
    }
    else {
        videoWrapper.css('width', 0.7*windowWidth+'px');
    }
    
    setTimeout(function(){
        button.css('display', 'none');
        videoWrapper.css('transition', 'none');
    }, 500);
    
    darkBg.click(function(){
        minimizeVideo(videoIndex, windowWidth);
    });
    closePopUp.click(function(){
        minimizeVideo(videoIndex, windowWidth);
    });
}


function minimizeVideo(videoIndex, windowWidth){
    var button = videoButtons.eq(videoIndex);
    var videoWrapper = button.parent();
    var video = button.prev();
    
    video.attr('controls', false);
    
    showMenu(windowWidth);
    hideDark();
    
    button.css('display', 'block').fadeTo(0.5,1);
    videoWrapper.css(closeOptions); 
    if (windowWidth >= 900){
        videoWrapper.css('width', '23%');
    }
    else {
        videoWrapper.css('width', '80%');
    }
    
    setTimeout(function(){
        videoWrapper.css('transition', 'width 0.5s, height 0.5s');
    }, 500);
    
    darkBg.off('click');
    closePopUp.off('click');
}


for (i=0; i<videoButtons.length; i++){
    (function(){
        var j = i;
        videoButtons.eq(j).click(function() {
            enlargeVideo(j);
        }) 
    })();  
}

exports.minimizeVideo = minimizeVideo;