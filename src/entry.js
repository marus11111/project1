require('./entry.scss');
require('./js/modernizr-custom');
require('./js/eventHandlers/stickyMenu');
require('./js/eventHandlers/animations');
require('./js/eventHandlers/smoothScroll');
require('./js/eventHandlers/resizeHandler');
require('./js/navigation/hamburgerMenu');
require('./js/media/openCloseVideo');
require('./js/media/openClosePhoto');
require('./js/slider/slider');
require('./js/canvas/canvasFunctions');

//prevent default on forms
var forms = require('./js/helpers/getDOMElements').forms;
forms.click(function(e) {
  e.preventDefault();
});