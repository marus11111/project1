var DOM = require('../helpers/getDOMElements');
var hamburgerButton = DOM.hamburgerButton;
var hamburgerLines = DOM.hamburgerLines;
var menu = DOM.menu;
var menuItems = DOM.menuItems;
var darkBg = DOM.darkBg;

var menuOpen = false;

function openMenu() {
    menuOpen = true;
    menu.css('display', 'block').fadeTo(0.5, 1);
    darkBg.css('display', 'block').fadeTo(0.5, 1);
    hamburgerLines.eq(0).css('transform', 'rotate(-45deg) scale(1.4142) translate(9%, -50%)');
    hamburgerLines.eq(1).fadeTo(0.5, 0);
    hamburgerLines.eq(2).css('transform', 'rotate(45deg) scale(1.4142) translate(9%, 50%)');
    
    darkBg.click(function() {
        if (window.innerWidth < 950) {
            closeMenu();
        }
    });
}

function closeMenu() {
    menuOpen = false;
    menu.fadeTo(0.5, 0);
    darkBg.fadeTo(0.5, 0);
    setTimeout(function () {
        menu.css('display', 'none');
        darkBg.css('display', 'none');
    }, 500);
    hamburgerLines.eq(0).css('transform', 'none');
    hamburgerLines.eq(1).fadeTo(0.5, 1);
    hamburgerLines.eq(2).css('transform', 'none');
    
    darkBg.off('click');
}

function hamburgerClick() {
    if(menuOpen) {
        closeMenu();
    }
    else {
        openMenu();
    }
}

hamburgerButton.click(hamburgerClick);
menuItems.click(function(){
    if (window.innerWidth < 950) {
        closeMenu();
    }
});