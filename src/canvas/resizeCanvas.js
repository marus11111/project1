var drawSkillBars = require('./skillBars').drawSkillBars;
var SkillBarsOptions = require('./skillBarsOptions').SkillBarsOptions;

function resizeCanvas(bodyWidth) {
    var currentOptions = new SkillBarsOptions(bodyWidth);
    drawSkillBars(currentOptions);
}

exports.resizeCanvas = resizeCanvas;