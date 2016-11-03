var DOMElements = require('../helpers/getDOMElements');
var slides = DOMElements.sliderSlides;
var circles = DOMElements.sliderCircles;

function slider(intervalTime){

    var ongoingTransition = false;
    var currentSlide = 0;
    
    circles.parent().css('display', 'block');

    function changeSlides(current, next) {
        if(current==next || ongoingTransition){
            return;
        }
        ongoingTransition = true;
        slides.eq(current).css({
            'transition':'left 1s',
            'left': '-100%'
        });
        slides.eq(next).css({
            'transition':'left 1s',
            'left': 0
        });
        circles.eq(current).css('background-color', 'rgba(255,114,0,0)');
        circles.eq(next).css('background-color', 'rgba(255,114,0,1)');
        setTimeout(function(){
            slides.eq(current).css({
                'transition': 'none',
                'left': '100%'
            });
            setTimeout(function(){
                ongoingTransition = false;
                currentSlide = next;
            },100);
        },1000);
    }

    function intervalCallback(){
        if (currentSlide==4){
            changeSlides(currentSlide, 0);
        }
        else {
            changeSlides(currentSlide, currentSlide+1);
        }
    }
    
    var autoSlideChange = setInterval(intervalCallback,intervalTime);
    
    circles.each(function(i){
       circles.eq(i).click(function(){
           changeSlides(currentSlide, i);
           clearInterval(autoSlideChange);
           autoSlideChange = setInterval(intervalCallback, intervalTime)
       }); 
    });
}

module.exports = slider;


