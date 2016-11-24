var DOM = require('../helpers/getDOMElements');
var imageHover = DOM.imageHover;
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

function enlargePhoto(photoIndex) {
    var hover = imageHover.eq(photoIndex);
    var photoWrapper = hover.parent();
    var photo = hover.prev();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    hideMenu(windowWidth);
    showDark();
    
    hover.css('display', 'none');
    photoWrapper.css(openOptions).css('max-width', 'none');
    if (windowHeight>windowWidth){
        photoWrapper.css('width', '95%'); 
    }
    else {
        photoWrapper.css('width', 0.7*windowWidth+'px');
    }
    
    setTimeout(function(){
        photoWrapper.css('transition', 'none');
    }, 500);
    
    darkBg.click(function(){
        minimizePhoto(photoIndex, windowWidth);
    });
    closePopUp.click(function(){
        minimizePhoto(photoIndex, windowWidth);
    });
}


function minimizePhoto(photoIndex, windowWidth){
    var hover = imageHover.eq(photoIndex);
    var photoWrapper = hover.parent();
    var photo = hover.prev();
    
    showMenu(windowWidth);
    hideDark();
    
    hover.css('display', 'block');
    photoWrapper.css(closeOptions).css('max-width', '500px'); 
    if (windowWidth >= 950){
        photoWrapper.css('width', '25%');
    }
    else {
        photoWrapper.css('width', '80%');
    }
    setTimeout(function(){
        photoWrapper.css('transition', 'width 0.5s, height 0.5s');
    }, 500);
    
    darkBg.off('click');
    closePopUp.off('click');
}


for (i=0; i<imageHover.length; i++){
    (function(){
        var j = i;
        imageHover.eq(j).click(function() {
            enlargePhoto(j);
        }) 
    })();  
}

exports.minimizePhoto = minimizePhoto;