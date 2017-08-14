class Skill{
    constructor(name, amt){
        this.name = name;
        this.amt=amt
    }
}

let skills = [];

skills.push(new Skill('JavaScript (ES5 & 6)', .9));
skills.push(new Skill('HTML', .85));
skills.push(new Skill('CSS', .75));
skills.push(new Skill('Ruby', .85));
skills.push(new Skill('R', .5));
skills.push(new Skill('Git', .85));
skills.push(new Skill('jQuery', .75));
skills.push(new Skill('p5.js', .9));
skills.push(new Skill('Jasmine.js', .85));
skills.push(new Skill('React.js',.5));
skills.push(new Skill('SQL', .6));

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

(()=>{
    let count = 0.3;
    for(let s of skills){
        let obj;
        if(Math.random()<.1){
            obj = $(`<p class='skill_pill wow bounceIn' data-wow-delay="${count}s">${s.name} : ${Math.round(s.amt*100)}% </p>`);
            obj.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                obj.animateCss('hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    obj.animateCss('bounceInUp');
                });
            });
        }else{
            obj = $(`<p class='skill_pill wow bounceIn' data-wow-delay="${count}s">${s.name} : ${Math.round(s.amt*100)}% </p>`);
        }

        $('.skills').append(obj);
        count+=.2;
    }
})();