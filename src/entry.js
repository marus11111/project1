require('./scss/entry.scss');
require('./eventHandlers/scrollHandler');
require('./eventHandlers/resizeHandler');
require('./navigation/hamburgerMenu');
var drawSkillBars = require('./canvas/skillBars').drawSkillBars;
var SkillBarsOptions = require('./canvas/skillBarsOptions').SkillBarsOptions;
var baseWidth = require('./eventHandlers/resizeHandler').baseWidth;
var slider = require('./slider/slider');

slider(5000);

var initialOptions = new SkillBarsOptions(baseWidth);
drawSkillBars(initialOptions);