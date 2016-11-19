var canvas = require('../helpers/getDOMElements').canvas;

var pi = Math.PI;
var ctx = canvas.getContext('2d');

function drawSingleBar(x, y, radius, start, currentPercent){
    var end = 2*pi*currentPercent/100 - 0.35*pi;
    
    ctx.clearRect(x-radius-5, 0, 2*radius+10, canvas.height);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*pi);
    ctx.lineWidth = 0.08*canvas.height;
    ctx.strokeStyle = 'rgb(234,234,234)';
    ctx.textAlign = 'center';
    ctx.font = 'bold '+0.43*radius+'px Lato';
    ctx.fillText(currentPercent+'%', x+0.05*radius, y+0.14*radius, 2*radius);
    ctx.stroke(); 
    
    ctx.beginPath();
    ctx.arc(x, y, radius, start - 0.01*pi, end + 0.01*pi);
    ctx.lineWidth = 0.12*canvas.height;
    ctx.strokeStyle = 'rgb(247,247,247)';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, radius, start + 0.01*pi, end - 0.01*pi);
    ctx.lineWidth = 0.08*canvas.height;
    ctx.strokeStyle = 'rgb(0,204,255)';
    ctx.stroke(); 
}

function drawSkillBars(options){
    var percent = 1;
    canvas.width = options.width;
    canvas.height = options.height;
    
    var interval = setInterval(function(){
        for(var i = 1; i<=4;i++){
            var skill = options['skill'+i];
            if(percent>skill.percent){
                continue;
            }
            else{
                drawSingleBar(skill.x, options.y, options.radius, options.startAngle, percent);
            }
        }
        percent++;
        if (percent>100){
            clearInterval(interval);
        }
    }, 20);
}

exports.drawSkillBars = drawSkillBars;