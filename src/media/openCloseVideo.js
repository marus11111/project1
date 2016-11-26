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


//enlarges video after clicking on 'play' button
function enlargeVideo(videoIndex) {
    var button = videoButtons.eq(videoIndex);
    var videoWrapper = button.parent();
    var video = button.prev();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    //turn controls on
    video.attr('controls', true);
    
    //hide menu and show dark background
    hideMenu(windowWidth);
    showDark();
    
    //hide big orange play button 
    button.fadeTo(0.5, 0);
    
    //resize and reposition video
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
    
    //close video by clicking on dark background or close button
    darkBg.click(function(){
        minimizeVideo(videoIndex, windowWidth);
    });
    closePopUp.click(function(){
        minimizeVideo(videoIndex, windowWidth);
    });
}

//closes enlarged video
function minimizeVideo(videoIndex, windowWidth){
    var button = videoButtons.eq(videoIndex);
    var videoWrapper = button.parent();
    var video = button.prev();
    
    //remove controls
    video.attr('controls', false);
    
    //show menu and hide dark background
    showMenu(windowWidth);
    hideDark();
    
    //resize and reposition video
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
    
    //remove event listeners - the same elements are used to close 
    //photo or menu, so event listeners are removed to prevent conflicts (e.g.
    // hiding big screen menu when closing video)
    darkBg.off('click');
    closePopUp.off('click');
}

//attach event handlers to buttons on video
for (i=0; i<videoButtons.length; i++){
    (function(){
        var j = i;
        videoButtons.eq(j).click(function() {
            enlargeVideo(j);
        }) 
    })();  
}

exports.minimizeVideo = minimizeVideo;