var menu = require('../helpers/getDOMElements').menu;
var menuTop = 0.097 * window.innerHeight;

//Sticky menu on scroll
function scrollHandler(){
    var scroll = window.scrollY || window.pageYOffset;
    if(scroll>=menuTop && !menu.hasClass('menu--fixed')){
        menu.addClass('menu--fixed'); 
    }
    else if (scroll<menuTop) {
        menu.removeClass('menu--fixed');
    }
}

$(window).scroll(scrollHandler);