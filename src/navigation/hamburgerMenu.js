var DOM = require('../helpers/getDOMElements');
var hamburgerButton = DOM.hamburgerButton;
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
    
    //modify button to display x
    hamburgerButton.addClass('hamburger--active');
    
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
    
    //modify button so that it's hamburger again
    hamburgerButton.removeClass('hamburger--active');
    
    //remove event listener - the same elements are used to close 
    //video or photo, so event listeners are removed to prevent conflicts (e.g.
    // hiding big screen menu when closing video)
    darkBg.off('click');
}

//event handler for hamburger button
function hamburgerClick() {
    menuOpen ? closeMenu() : openMenu();
}

hamburgerButton.click(hamburgerClick);

//close menu when menu item is clicked
menuItems.click(function(){
    if (window.innerWidth < 1070) {
        closeMenu();
    }
});

exports.closeMenu = closeMenu;