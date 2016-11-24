require('./scss/entry.scss');
require('./eventHandlers/scrollHandler');
require('./eventHandlers/resizeHandler');
require('./navigation/hamburgerMenu');
require('./media/openCloseVideo');
require('./media/openClosePhoto');

require('./pics/blog1.png');
require('./pics/blog2.png');
require('./pics/blog3.png');
require('./pics/engineer1.png');
require('./pics/engineer2.png');
require('./pics/engineer3.png');
require('./pics/engineer4.png');
require('./pics/engineer5.png');
require('./pics/engineer6.png');
require('./pics/facebook.png');
require('./pics/twitter.png');
require('./pics/google-plus.png');
require('./pics/linkedin.png');


var canvas = require('./helpers/getDOMElements').canvas;
var drawCircles = require('./canvas/circles').drawCircles;
var CanvasOptions = require('./canvas/CanvasOptions').CanvasOptions;
var windowWidth = require('./eventHandlers/resizeHandler').windowWidth;
var slider = require('./slider/slider');

slider(5000);

var initialOptions = new CanvasOptions(windowWidth);

$(window).scroll(function(){
    if((canvas.getBoundingClientRect().top - window.innerHeight) < 0){
        drawCircles(initialOptions);
        $(window).off('scroll');
    }
});