var pi = Math.PI;

var CanvasOptions = function CanvasOptions(bodyWidth){
    if (bodyWidth > 650){
        this.width = 0.7*bodyWidth;
        this.height = 0.169*this.width;
        this.radius = 0.438*this.height;
        this.y = this.height/2;
        this.skill1 = {
            x: 0.088*this.width,
        };
        this.skill2 = {
            x: 0.3627*this.width,
        };
        this.skill3 = {
            x: 0.6374*this.width,
        };
        this.skill4 = {
            x: 0.912*this.width,
        };
    }
    else {
        this.width = 0.8*bodyWidth;
        this.height = this.width;
        this.radius = 0.15*this.height;
        this.y = this.height/4;
        this.skill1 = {
            x: 0.25*this.width,
        };
        this.skill2 = {
            x: 0.75*this.width,
        };
        this.skill3 = {
            x: 0.25*this.width,
            y: this.y*3,
        };
        this.skill4 = {
            x: 0.75*this.width,
            y: this.y*3,
        };
    }
    this.startAngle = pi*1.5;
    this.skill1.percent = 85;
    this.skill2.percent = 90;
    this.skill3.percent = 90;
    this.skill4.percent = 80;
}

exports.CanvasOptions = CanvasOptions;