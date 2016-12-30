var DOM = require('../helpers/getDOMElements');
var imageHover = DOM.imageHover;
var darkBg = DOM.darkBg;
var closePopUp = DOM.closePopUp;
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
    
    //resize and position photo
    photoWrapper.addClass('single-image--enlarged');
    
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
    
    //resize and position photo to its origina state
    photoWrapper.removeClass('single-image--enlarged');
    
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