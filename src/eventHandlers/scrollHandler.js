var nav = require('../helpers/getDOMElements').nav;
var menuTop = 0.097 * window.innerHeight;

function scrollHandler(){
    var scroll = window.scrollY || window.pageYOffset;
    if(scroll>=menuTop && !nav.hasClass('menu-fixed-state')){
        nav.addClass('menu-fixed-state'); 
    }
    else if (scroll<menuTop) {
        nav.removeClass('menu-fixed-state');
    }
}

$(window).scroll(scrollHandler);