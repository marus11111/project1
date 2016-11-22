var canvas = require('../helpers/getDOMElements').canvas;

var pi = Math.PI;
var ctx = canvas.getContext('2d');

function drawSingleCircle(x, y, radius, start, currentPercent, description, descriptionFont, descriptionY){
    var end = 1.5*pi - (2*pi*currentPercent/100);
    
    ctx.clearRect(x-radius-5, y-radius-5, 3*radius, 3*radius);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*pi);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(112,78,57)';
    ctx.stroke(); 
    
    ctx.textAlign = 'center';
    ctx.font = 0.37*radius+'px Roboto';
    ctx.fillStyle = 'rgb(255,114,0)';
    ctx.fillText(currentPercent+'%', x+0.05*radius, y+0.11*radius, 2*radius);
    
    ctx.textAlign = 'center';
    ctx.font = 'bold '+descriptionFont+' Roboto';
    ctx.fillStyle = 'black';
    ctx.fillText(description, x, y+descriptionY, 3*radius);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, start, end, true);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(255,114,0)';
    ctx.stroke(); 
}

function drawCircles(options){
    var percent = 1;
    canvas.width = options.width;
    canvas.height = options.height;
    
    var interval = setInterval(function(){
        for(var i = 1; i<=4;i++){
            var skill = options['skill'+i];
            var y = skill.y || options.y;
            if(percent>skill.percent){
                continue;
            }
            else{
                drawSingleCircle(skill.x, y, options.radius, options.startAngle, percent, skill.description, options.descriptionFont, options.descriptionY);
            }
        }
        percent++;
        if (percent==100){
            clearInterval(interval);
        }
    }, 20);
}

exports.drawCircles = drawCircles;