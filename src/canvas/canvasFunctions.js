var canvas = require('../helpers/getDOMElements').canvas;
var CanvasOptions = require('./CanvasOptions').CanvasOptions;

var pi = Math.PI;
var ctx = canvas.getContext('2d');


//sets canvas size 
function setCanvas(width, height){
    
    var ratio = window.devicePixelRatio;
    
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    ctx.scale(ratio, ratio);
}

//draws single thin full circle that will be below skill bar 
function drawThinCircle(x, y, radius, percent, description, descriptionY) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*pi);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(112,78,57)';
    ctx.stroke();
    
    ctx.textAlign = 'center';
    ctx.font = 0.37*radius+'px Roboto';
    ctx.fillStyle = 'rgb(255,114,0)';
    ctx.fillText(percent+'%', x+0.05*radius, y+0.11*radius, 2*radius);
    
    ctx.textAlign = 'center';
    ctx.font = 'bold 1em Roboto';
    ctx.fillStyle = 'black';
    ctx.fillText(description, x, y+descriptionY, 3*radius);
}

//draws single full skill bar for a given percentage (but doesn't animate)
function drawSingleCircle(x, y, radius, start, currentPercent, description, descriptionY){
    
    //clear canvas from previous percent
    ctx.clearRect(x-radius-15, y-radius-15, 3*radius, 3.3*radius);
    
    //draw thin grey circle and text
    drawThinCircle(x, y, radius, currentPercent, description, descriptionY);
    
    //angle that determines what part of full circle to draw
    var end = 1.5*pi - (2*pi*currentPercent/100);
    
    //draw thicker orange circle on top
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end, true);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(255,114,0)';
    ctx.stroke(); 
}

//draws four initial 0% circles
function drawInitialCircles(options){
    
    setCanvas(options.width, options.height);
    
    for (var i = 1; i <= 4; i++){
        var skill = options['skill'+i];
        var y = skill.y || options.y;
        drawThinCircle(skill.x, y, options.radius, 0, skill.description, options.descriptionY);
    }
}

//animates all four circles going from 1% to percent given in options
function drawCircles(options){
    
    setCanvas(options.width, options.height);
    
    var percent = 1;
    var interval = setInterval(function(){
        for(var i = 1; i<=4;i++){
            var skill = options['skill'+i];
            var y = skill.y || options.y;
            if(percent>skill.percent){
                continue;
            }
            else{
                drawSingleCircle(skill.x, y, options.radius, options.startAngle, percent, skill.description, options.descriptionY);
            }
        }
        percent++;
        if (percent===100){
            clearInterval(interval);
        }
    }, 20);
}


//Draws circles after scrolling to canvas.
//canvasDrawn variable and isCanvasDrawn function are there 
//to inform resize handler whether it should just update canvas 
//options and redraw initial 0% circles or redraw full canvas
var canvasDrawn = false;
function isCanvasDrawn() {
    return canvasDrawn;
}
function drawCirclesOnScroll(options){
    if((canvas.getBoundingClientRect().bottom - window.innerHeight) < 0){
        drawCircles(options);
        canvasDrawn = true;
        $(document).off('scroll');
    }
}

//draw initial 0% circles
var initialOptions = new CanvasOptions(window.innerWidth);
drawInitialCircles(initialOptions);

//variable and function created so that resizeHandler can pass updated canvas options to this module
var newOptions;
function getNewOptions(options) {
    newOptions = options;
}

$(document).scroll(function(){
    var options = newOptions || initialOptions;
    drawCirclesOnScroll(options);
});

exports.drawCircles = drawCircles;
exports.drawInitialCircles = drawInitialCircles;
exports.getNewOptions = getNewOptions;
exports.isCanvasDrawn = isCanvasDrawn;