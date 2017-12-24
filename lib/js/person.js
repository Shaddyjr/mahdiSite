// class name changes ["Person","Coder","Designer","Learner"]
class Person{
    constructor(){
        this.name = "Mahdi Shadkamfarrokhi";
        this.img = "asset/mahdi.jpg";
        this.location = "New York City";
        this.about_me = "I am a human being (as far as I can tell). I was born and raised in New York City and wouldn't want to live anywhere else. When I'm not working I'm probably coding, watching a movie, or taking care of a baby.";
    
        this.favorite = {
            color: "red (the color of passion!)",
            pet: "cat",
            movie: "The Matrix",
            food: "quinoa salad",
            drink: "roasted brown rice green tea"
        }
        this.skills = [
            "JS",
            "HTML",
            "CSS",
            "Ruby",
            "R",
            "Git",
            "jQuery",
            "p5.js",
            "Jasmine.js",
            "React.js",
            "SQL",
            "Python",
            "Node.js",
            "Bootstrap",
            "Data Mining",
            "Predictive Modeling",
            "Bioinformatics tools and databases"
        ];
        this.experience();
        this.contact();
    }

    experience(){
        this.education = [
            {
                school:"Georgetown University",
                year_graduated:2007,
                degree:"Bachelors of Science in Biology"
            },
            {
                school:"New York University",
                year_graduated:2014,
                degree:"Masters in Biology"
            }
        ];

        this.work = [
            {
                name: "All Star Code",
                title: "Curriculum Director",
                time: "2017-current"
            },
            {
                name: "All Star Code",
                title: "Curriculum Manager",
                time: "2016-2017"
            },
            {
                name: "Scholar Stem",
                title: "Teacher",
                time: "2015-2016"
            }
        ];

        this.projects = [
            {
                name: "Algorithms Lesson",
                description:"This is a sample of one of the many lessons I've designed. This particular project focuses on creating an algorithm for the 'Infinite Monkey Theorem', which states that an infinite number of monkeys typing on an infinite number of keyboards will eventually type the complete works of Shakespeare. In this exercise, students are tasked with creating a more efficient algorithm than pure randomness.", 
                direct_link:"http://rawgit.com/mahdiASC/monkey_on_keyboard/answer_feat1/index.html",
                github_link:"https://github.com/mahdiASC/monkey_on_keyboard/tree/answer_feat1"
            },
            {
                name: "Death App",
                description:"Using data from the CDC for deaths in the US, this interesting, if not morbid, application can predict a peron's cause of death with a ~70% accuracy based on the most significant variables available.",
                direct_link:"https://shaddyjr.shinyapps.io/DeathApp/"
            },
            {
                name: "Pokemon Gem",
                description:"In this Ruby gem command line interface (CLI) game, the player creates their pokemon roster and battles the opposing 'Poorly Designed Boss'. Do you have what it takes to defeat him and his roster of pokemon with perfect stats?",
                direct_link:"https://rubygems.org/gems/poor-pokemon-cli",
                github_link:"https://github.com/mahdiASC/cli-data-gem-assessment-v-000"
            }
        ];
    }


    contact(){
        this.email = "shaddyjr@gmail.com";
        this.linkedin = "https://www.linkedin.com/in/mahdi-shadkamfarrokhi-8a410958";
        this.twitter = "https://twitter.com/Shaddymaze";
        this.github_1 = "https://github.com/mahdiASC";
        this.github_2 = "https://github.com/Shaddyjr";
    }
}

// Copyright © 2017 Mahdi Shadkamfarrokhi | All rights reserved

let mahdi = new Person;
