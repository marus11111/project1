var drawCircles = require('./circles').drawCircles;
var CanvasOptions = require('./CanvasOptions').CanvasOptions;

function resizeCanvas(bodyWidth) {
    var currentOptions = new CanvasOptions(bodyWidth);
    drawCircles(currentOptions);
}

exports.resizeCanvas = resizeCanvas;