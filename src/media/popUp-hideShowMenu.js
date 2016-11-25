var DOM = require('../helpers/getDOMElements');
var menu = DOM.menu;
var hamburgerButton = DOM.hamburgerButton;

function popUpShowMenu(windowWidth) {
    if (windowWidth>=1070){
        menu.css('display', 'block').fadeTo(0.5, 1);
        hamburgerButton.css('display', 'none');
    }
    else if (windowWidth<1070){
        hamburgerButton.css('display', 'block').fadeTo(0.5, 1);
    }
}

function popUpHideMenu(windowWidth) {
    if (windowWidth>=1070){
        menu.fadeTo(0.5, 0);
        setTimeout(function(){
            menu.css('display', 'none');
        }, 500); 
    }
    else {
        hamburgerButton.fadeTo(0.5, 0);
        setTimeout(function(){
            hamburgerButton.css('display', 'none');
        }, 500);
    }
}

exports.popUpShowMenu = popUpShowMenu;
exports.popUpHideMenu = popUpHideMenu;