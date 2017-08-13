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

(()=>{
    let count = 0.3;
    for(let s of skills){
        let text = `<p class='skill_pill wow bounceIn' data-wow-delay="${count}s">${s.name} : ${Math.round(s.amt*100)}% </p>`
        $('.skills').append(text);
        count+=.2;
    }
})();