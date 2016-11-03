var pi = Math.PI;

var SkillBarsOptions = function SkillBarsOptions(bodyWidth){
    this.width = 0.563*bodyWidth;
    this.height = 0.169*this.width;
    this.radius = 0.438*this.height;
    this.startAngle = pi*1.65;
    this.y = this.height/2;
    this.skill1 = {
        x: 0.088*this.width,
        percent: 58
    };
    this.skill2 = {
        x: 0.3627*this.width,
        percent: 75
    };
    this.skill3 = {
        x: 0.6374*this.width,
        percent: 80
    };
    this.skill4 = {
        x: 0.912*this.width,
        percent: 95
    };
}

exports.SkillBarsOptions = SkillBarsOptions;