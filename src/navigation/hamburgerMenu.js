var DOM = require('../helpers/getDOMElements');
var hamburgerButton = DOM.hamburgerButton;
var hamburgerLines = DOM.hamburgerLines;
var menu = DOM.menu;
var menuDarkBg = DOM.menuDarkBg;

var menuOpen = false;

function openMenu() {
    menuOpen = true;
    menu.css({
        'z-index': 1,
        'background-color': 'rgba(140, 140, 140, 0.9)'
    });
    menu.fadeTo(0.5, 1);
    hamburgerLines.eq(0).css('transform', 'rotate(-45deg) scale(1.4142) translate(9%, -50%)');
    hamburgerLines.eq(1).fadeTo(0.5, 0);
    hamburgerLines.eq(2).css('transform', 'rotate(45deg) scale(1.4142) translate(9%, 50%)');
}

function closeMenu() {
    menuOpen = false;
    menu.fadeTo(0.5, 0);
    setTimeout(function () {
        menu.css({
            'z-index': 0,
            'background-color': 'rgba(140, 140, 140, 0.6)'
        });
    }, 500);
    hamburgerLines.eq(0).css('transform', 'none');
    hamburgerLines.eq(1).fadeTo(0.5, 1);
    hamburgerLines.eq(2).css('transform', 'none');
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
menuDarkBg.click(closeMenu);