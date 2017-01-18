var DOM = require('../helpers/getDOMElements');
var hamburgerButton = DOM.hamburgerButton;
var menu = DOM.menu;
var menuItems = DOM.menuItems;
var darkBg = DOM.darkBg;
var showHide = require('../helpers/showHide');
var show = showHide.show;
var hide = showHide.hide;

//variable to be used as flag that informes whether to close or open menu after clicking on hamburger button
var menuOpen = false;
var menuBreakpoint = 1070;

function openMenu() {
    
    //set flag to true
    menuOpen = true;
    
    //show menu and dark background
    show(menu);
    show(darkBg);
    
    //modify button to display x
    hamburgerButton.addClass('hamburger--active');
    
    //close menu by clicking on background
    darkBg.click(closeMenu);
}

function closeMenu() {
    
    //set flag to false
    menuOpen = false;
    
    //hide menu and dark background
    hide(menu);
    hide(darkBg);
        
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
    if (window.innerWidth < menuBreakpoint) {
        closeMenu();
    }
});

exports.menuBreakpoint = menuBreakpoint;