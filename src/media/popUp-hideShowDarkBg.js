var DOM = require('../helpers/getDOMElements');
var darkBg = DOM.darkBg;
var closePopUp = DOM.closePopUp;

function popUpShowDark() {
    closePopUp.css('display', 'block');
    darkBg.css('display', 'block').fadeTo(0.5, 1);
}

function popUpHideDark() {
    darkBg.fadeTo(0.5, 0);
    setTimeout(function(){
        darkBg.css('display', 'none');
        closePopUp.css('display', 'none');
    }, 500);
}

exports.popUpShowDark = popUpShowDark;
exports.popUpHideDark = popUpHideDark;