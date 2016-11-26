var DOMElements = require('../helpers/getDOMElements');
var slides = DOMElements.sliderSlides;
var circles = DOMElements.sliderCircles;

function slider(intervalTime){
    
    //flag to prevent function from firing while slides are already being changed
    var ongoingTransition = false;
    var currentSlide = 0;
    
    //takes indexes of current slide and slide we want to navigate to and
    //changes slides
    function changeSlides(current, next) {
        
        //return if user wants to navigate to the current slide or 
        //slide is currently changing (if flag is set to true)
        if(current==next || ongoingTransition){
            return;
        }
        
        //sets flag to true
        ongoingTransition = true;
        
        //moves slides
        slides.eq(current).css({
            'transition':'left 1s',
            'left': '-100%'
        });
        slides.eq(next).css({
            'transition':'left 1s',
            'left': 0
        });
        
        //changes 'active' circle
        circles.eq(current).css('background-color', 'rgba(255,114,0,0)');
        circles.eq(next).css('background-color', 'rgba(255,114,0,1)');
        
        setTimeout(function(){
            
            //when transition is over, moves previous slide over the right 
            //side of screen - from there it can slide-in again
            slides.eq(current).css({
                'transition': 'none',
                'left': '100%'
            });
            
            //set flag to false 
            ongoingTransition = false;
            
            //update number of current slide
            currentSlide = next;
        },1000);
    }
    
    //callback for setInterval that will be changing slides automatically 
    function intervalCallback(){
        if (currentSlide==4){
            changeSlides(currentSlide, 0);
        }
        else {
            changeSlides(currentSlide, currentSlide+1);
        }
    }
    
    //set interval to change slides automatically
    var autoSlideChange = setInterval(intervalCallback,intervalTime);
    
    //navigate by clicking on circles at the bottom of masthead
    circles.each(function(i){
       circles.eq(i).click(function(){
           
           //change slide to the one chosen by user
           changeSlides(currentSlide, i);
           
           //reset interval so that next automatic change is after 
           //full interval period
           clearInterval(autoSlideChange);
           autoSlideChange = setInterval(intervalCallback, intervalTime)
       }); 
    });
}


//run slider
slider(5000);