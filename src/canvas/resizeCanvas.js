var drawCircles = require('./circles').drawCircles;
var CanvasOptions = require('./CanvasOptions').CanvasOptions;

function resizeCanvas(windowWidth) {
    var currentOptions = new CanvasOptions(windowWidth);
    drawCircles(currentOptions);
}

exports.resizeCanvas = resizeCanvas;