var resizeCanvas = require('../canvas/resizeCanvas').resizeCanvas;
var menu = require('../helpers/getDOMElements').menu;

var baseWidth = window.innerWidth;
var timeout; 

function resizeHandler(){
    baseWidth = window.innerWidth;
    if (baseWidth >= 950){
        menu.css({
            'display': 'block',
            'opacity': 1
        });
    }
    else {
        menu.css({
            'display': 'none',
            'opacity': 0
        });
    }
    clearTimeout(timeout);
    timeout = setTimeout(function(){
        resizeCanvas(baseWidth); 
    }, 500);
    
}

$(window).resize(resizeHandler);

exports.baseWidth = baseWidth;