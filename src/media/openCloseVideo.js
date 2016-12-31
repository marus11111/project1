var DOM = require('../helpers/getDOMElements');
var videoButtons = DOM.videoButtons;
var darkBg = DOM.darkBg;
var closePopUp = DOM.closePopUp;
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
    
    //turn controls on
    video.attr('controls', true);
    
    //hide menu and show dark background
    hideMenu(windowWidth);
    showDark();
    
    //resize and reposition video
    videoWrapper.addClass('video-wrapper--enlarged');
    
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
    
    //resize and reposition video to its original state
    videoWrapper.removeClass('video-wrapper--enlarged');
    
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