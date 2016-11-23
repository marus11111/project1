var pi = Math.PI;

var CanvasOptions = function CanvasOptions(bodyWidth){
    this.startAngle = pi*1.5;
    this.skill1 = {
        percent: 85,
        description: 'Modeling'
    }
    this.skill2 = {
        percent: 90,
        description: 'Quality'
    }
    this.skill3 = {
        percent: 90,
        description: 'Durability'
    }
    this.skill4 = {
        percent: 80,
        description: 'Organising'
    }
    if (bodyWidth > 650){
        this.width = 0.7*bodyWidth;
        this.height = 0.28*this.width;
        this.radius = 0.3*this.height;
        this.y = this.height/2.6;
        this.descriptionY = 1.8*this.radius;
        this.skill1.x = 0.1*this.width;
        this.skill2.x = 0.3666*this.width;
        this.skill3.x = 0.6334*this.width;
        this.skill4.x = 0.9*this.width;
    }
    else {
        this.width = 0.8*bodyWidth;
        this.height = this.width;
        this.radius = 0.15*this.height;
        this.y = this.height/4;
        this.descriptionY = 1.6*this.radius;
        this.skill1.x = 0.25*this.width;
        this.skill2.x = 0.75*this.width;
        this.skill3.x = 0.25*this.width;  
        this.skill3.y = this.y*3;
        this.skill4.x = 0.75*this.width;  
        this.skill4.y = this.y*3;
    }
    console.log(this);
}

exports.CanvasOptions = CanvasOptions;