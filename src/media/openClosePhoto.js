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

//open photo
function enlargePhoto(photoIndex) {
    var hover = imageHover.eq(photoIndex);
    var photoWrapper = hover.parent();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    //hide menu and show dark background
    hideMenu(windowWidth);
    showDark();
    
    //hide element that normally is on top of photo and is visible on hover
    hover.css('display', 'none');
    
    //resize and reposition photo
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
    
    
    //close photo by clicking on dark background or close button
    darkBg.click(function(){
        minimizePhoto(photoIndex, windowWidth);
    });
    closePopUp.click(function(){
        minimizePhoto(photoIndex, windowWidth);
    });
}

//close enlarged photo
function minimizePhoto(photoIndex, windowWidth){
    var hover = imageHover.eq(photoIndex);
    var photoWrapper = hover.parent();
    
    //show menu and hide dark background
    showMenu(windowWidth);
    hideDark();
    
    //bring back element that is on top of photo
    hover.css('display', 'block');
    
    //resize and reposition photo
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
    
    //remove event listeners - the same elements are used to close 
    //video or menu, so event listeners are removed to prevent conflicts (e.g.
    // hiding big screen menu when closing video)
    darkBg.off('click');
    closePopUp.off('click');
}


//attach event handlers to elements that are on top of photos (they 
//are visible on hover)
for (i=0; i<imageHover.length; i++){
    (function(){
        var j = i;
        imageHover.eq(j).click(function() {
            enlargePhoto(j);
        }) 
    })();  
}

exports.minimizePhoto = minimizePhoto;