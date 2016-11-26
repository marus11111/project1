var DOM = require('../helpers/getDOMElements');
var hamburgerButton = DOM.hamburgerButton;
var hamburgerLines = DOM.hamburgerLines;
var menu = DOM.menu;
var menuItems = DOM.menuItems;
var darkBg = DOM.darkBg;

//variable to be used as flag that informes whether to close or open menu after clicking on hamburger button
var menuOpen = false;

function openMenu() {
    
    //set flag to true
    menuOpen = true;
    
    //show menu and dark background
    menu.css('display', 'block').fadeTo(0.5, 1);
    darkBg.css('display', 'block').fadeTo(0.5, 1);
    
    //transform lines on button to create X
    hamburgerLines.eq(0).css({
        'top': '50%',
        'transform': 'translate(-50%, -50%) rotate(-45deg)'
    });
    hamburgerLines.eq(1).fadeTo(0.5, 0);
    hamburgerLines.eq(2).css({
        'top': '50%',
        'transform': 'translate(-50%, -50%) rotate(45deg)'
    });
    
    //close menu by clicking on background
    darkBg.click(closeMenu);
}

function closeMenu() {
    
    //set flag to false
    menuOpen = false;
    
    //hide menu and dark background
    menu.fadeTo(0.5, 0);
    darkBg.fadeTo(0.5, 0);
    setTimeout(function () {
        menu.css('display', 'none');
        darkBg.css('display', 'none');
    }, 500);
    
    //transform lines on button so that they form hamburger again
    hamburgerLines.eq(0).css({
        'top': '22%',
        'transform': 'translate(-50%,-50%)'
    });
    hamburgerLines.eq(1).fadeTo(0.5, 1);
    hamburgerLines.eq(2).css({
        'top': '78%',
        'transform': 'translate(-50%,-50%)'
    });
    
    //remove event listener - the same elements are used to close 
    //video or photo, so event listeners are removed to prevent conflicts (e.g.
    // hiding big screen menu when closing video)
    darkBg.off('click');
}

//event handler for hamburger button
function hamburgerClick() {
    if(menuOpen) {
        closeMenu();
    }
    else {
        openMenu();
    }
}

hamburgerButton.click(hamburgerClick);

//close menu when menu item is clicked
menuItems.click(function(){
    if (window.innerWidth < 1070) {
        closeMenu();
    }
});