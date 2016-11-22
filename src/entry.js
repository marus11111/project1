require('./scss/entry.scss');
require('./eventHandlers/scrollHandler');
require('./eventHandlers/resizeHandler');
require('./navigation/hamburgerMenu');
var drawCircles = require('./canvas/circles').drawCircles;
var CanvasOptions = require('./canvas/CanvasOptions').CanvasOptions;
var baseWidth = require('./eventHandlers/resizeHandler').baseWidth;
var slider = require('./slider/slider');

slider(5000);

var initialOptions = new CanvasOptions(baseWidth);
drawCircles(initialOptions);