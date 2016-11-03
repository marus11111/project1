var resizeCanvas = require('../canvas/resizeCanvas').resizeCanvas;

var baseWidth = $('body').width();
var timeout; 

function resizeHandler(){
    clearTimeout(timeout);
    timeout = setTimeout(function(){
        baseWidth = $('body').width();
        resizeCanvas(baseWidth); 
    },500);
}

$(window).resize(resizeHandler);

exports.baseWidth = baseWidth;