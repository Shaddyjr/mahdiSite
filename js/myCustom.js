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

//skillPills
(()=>{
    let count = 0.3;
    let pick = skills[Math.floor(Math.random()*skills.length)];
    for(let s of skills){
        let obj = $(`<p class='skill_pill wow bounceIn' data-wow-delay="${count}s">${s.name} : ${Math.round(s.amt*100)}% </p>`);
        if(pick==s){
            obj.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                obj.delay(2000+10000*Math.random()).animateCss('hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        obj.animateCss('bounceInUp');
                });
            });
        }
        $('.skills').append(obj);
        count+=.2;
    }
})();
var x;
//fading text
(()=>{
    $('.fader').each(function(){
        let words = $(this).text().split(" ");
        $(this).empty();
        let t = 0.05;
        let num = 0;
        for(let word of words){
            if($(this)[0].parentElement.getAttribute('data-wow-delay')){
                num = Number($(this)[0].parentElement.getAttribute('data-wow-delay').replace('s',''));
            }
            $(this).append(`<span class='wow fadeInRight' data-wow-delay="${t+num}s">${word} </span>`);
            t+=0.05;
        }
    })
})();

//changing background
var header = $('.disc');

var backgrounds = new Array(
    'url(assets/best.jpg)'
  , 'url(assets/butterfly.jpg)'
  , 'url(assets/run.jpg)'
);

var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    header.css('background-image', backgrounds[current]);
}
setInterval(nextBackground, 5000);
