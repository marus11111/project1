var DOM = require('../helpers/getDOMElements');
var imageHover = DOM.imageHover;
var darkBg = DOM.darkBg;
var closePopUp = DOM.closePopUp;
var menu = DOM.menu;
var hamburgerButton = DOM.hamburgerButton;
var showHide = require('../helpers/showHide');
var show = showHide.show;
var hide = showHide.hide;
var menuBreakpoint = require('../navigation/hamburgerMenu').menuBreakpoint;

//open photo
function enlargePhoto(photoIndex) {
  var hover = imageHover.eq(photoIndex);
  var photoWrapper = hover.parent();
  var windowWidth = window.innerWidth;

  //hide menu and show dark background
  (windowWidth >= menuBreakpoint) ? hide(menu): hide(hamburgerButton);
  show(closePopUp);
  show(darkBg);

  //resize and position photo
  photoWrapper.addClass('single-image--enlarged');

  //close photo by clicking on dark background or close button
  darkBg.click(function () {
    minimizePhoto(photoIndex, windowWidth);
  });
  closePopUp.click(function () {
    minimizePhoto(photoIndex, windowWidth);
  });
}

//close enlarged photo
function minimizePhoto(photoIndex, windowWidth) {
  var hover = imageHover.eq(photoIndex);
  var photoWrapper = hover.parent();

  //show menu and hide dark background
  if (windowWidth >= menuBreakpoint) {
    show(menu);
    hide(hamburgerButton);
  } else {
    show(hamburgerButton);
  }
  hide(closePopUp);
  hide(darkBg);

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
for (i = 0; i < imageHover.length; i++) {
  (function () {
    var j = i;
    imageHover.eq(j).click(function () {
      enlargePhoto(j);
    })
  })();
}

exports.minimizePhoto = minimizePhoto;
