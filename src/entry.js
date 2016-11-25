require('./scss/entry.scss');
require('./eventHandlers/scrollHandler');
require('./eventHandlers/resizeHandler');
require('./navigation/hamburgerMenu');
require('./media/openCloseVideo');
require('./media/openClosePhoto');

require('./pics/sprite-blogs.jpg');
require('./pics/sprite-engineers.png');

var canvas = require('./helpers/getDOMElements').canvas;
var drawCircles = require('./canvas/circles').drawCircles;
var CanvasOptions = require('./canvas/CanvasOptions').CanvasOptions;
var windowWidth = require('./eventHandlers/resizeHandler').windowWidth;
var slider = require('./slider/slider');

slider(5000);

var initialOptions = new CanvasOptions(windowWidth);

$(document).scroll(function(){
    if((canvas.getBoundingClientRect().top - window.innerHeight) < 0){
        drawCircles(initialOptions);
        $(document).off('scroll');
    }
});