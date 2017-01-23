var DOM = require('../helpers/getDOMElements');
var videoButtons = DOM.videoButtons;
var darkBg = DOM.darkBg;
var closePopUp = DOM.closePopUp;
var menu = DOM.menu;
var hamburgerButton = DOM.hamburgerButton;
var showHide = require('../helpers/showHide');
var show = showHide.show;
var hide = showHide.hide;
var menuBreakpoint = require('../navigation/hamburgerMenu').menuBreakpoint;

//enlarges video after clicking on 'play' button
function enlargeVideo(videoIndex) {
  var button = videoButtons.eq(videoIndex);
  var videoWrapper = button.parent();
  var video = button.prev();
  var windowWidth = window.innerWidth;

  //turn controls on
  video.attr('controls', true);

  //hide menu and show dark background
  (windowWidth >= menuBreakpoint) ? hide(menu): hide(hamburgerButton);
  show(closePopUp);
  show(darkBg);

  //resize and reposition video
  videoWrapper.addClass('video__wrapper--enlarged');

  //close video by clicking on dark background or close button
  darkBg.click(function () {
    minimizeVideo(videoIndex, windowWidth);
  });
  closePopUp.click(function () {
    minimizeVideo(videoIndex, windowWidth);
  });
}

//closes enlarged video
function minimizeVideo(videoIndex, windowWidth) {
  var button = videoButtons.eq(videoIndex);
  var videoWrapper = button.parent();
  var video = button.prev();

  //remove controls
  video.attr('controls', false);

  //show menu and hide dark background
  if (windowWidth >= menuBreakpoint) {
    show(menu);
    hide(hamburgerButton);
  } else {
    show(hamburgerButton);
  }
  hide(closePopUp);
  hide(darkBg);;

  //resize and reposition video to its original state
  videoWrapper.removeClass('video__wrapper--enlarged');

  //remove event listeners - the same elements are used to close 
  //photo or menu, so event listeners are removed to prevent conflicts (e.g.
  // hiding big screen menu when closing video)
  darkBg.off('click');
  closePopUp.off('click');
}

//attach event handlers to buttons on video
for (i = 0; i < videoButtons.length; i++) {
  (function () {
    var j = i;
    videoButtons.eq(j).click(function () {
      enlargeVideo(j);
    })
  })();
}

exports.minimizeVideo = minimizeVideo;
