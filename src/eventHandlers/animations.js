var scrollAnim = require('../helpers/getDOMElements').scrollAnim;

//Index indicates which element's position will be compared with scroll position.
//At any point in time only one element will be subject of animations function.
var index = 0;
function animations() {
    
    //Calculate window position, element position and position, at which
    //animation will trigger.
    var windowBottom = $(window).scrollTop() + $(window).height();
    var offset = scrollAnim.eq(index).offset().top;
    var height = scrollAnim.eq(index).height();
    var breakpoint = offset + 0.2*height;
    
    //Check whether breakpoint has been reached and whether element doeasnt already have 
    //css class with animation
    if (windowBottom - breakpoint > 0 && !scrollAnim.eq(index).hasClass('scroll-anim')) { 
        scrollAnim.eq(index)
            .removeClass('initial-hide')
            .addClass('scroll-anim');
        
        //If index points at the last element, disable animations event handler,
        //else point index at next element and invoke self
        if (scrollAnim.length === index + 1) {
            $(window).off('scroll', animations);
            return;
        }
        else {
            index++;
            
            //Recursion is necessary to handle situation, when someone navigates 
            //to section of website in a way that omits scrolling (for example by 
            //using direct link to a section or by refreshing page). 
            //Invoking animations once on page load will animate all of the 
            //elements up to the position where user is.
            animations();
        }   
    }
}

if (Modernizr.cssanimations) {
    $(window).scroll(animations);
    $(window).on('load', animations);
}