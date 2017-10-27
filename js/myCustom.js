class Skill {
  constructor(name, amt) {
    this.name = name;
    this.amt = amt
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
skills.push(new Skill('React.js', .5));
skills.push(new Skill('SQL', .6));

$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);
    });
    return this;
  }
});

//skillPills
(() => {
  let count = 0.3;
  let pick = skills[Math.floor(Math.random() * skills.length)];
  for (let s of skills) {
    let obj = $(`<p class='skill_pill wow bounceIn' data-wow-delay="${count}s">${s.name} : ${Math.round(s.amt * 100)}% </p>`);
    if (pick == s) {
      obj.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        obj.delay(2000 + 10000 * Math.random()).animateCss('hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          obj.animateCss('bounceInUp');
        });
      });
    }
    $('.skills').append(obj);
    count += .2;
  }
})();
var x;
//fading text
(() => {
  $('.fader').each(function () {
    let words = $(this).text().split(" ");
    $(this).empty();
    let t = 0.05;
    let num = 0;
    for (let word of words) {
      if ($(this)[0].parentElement.getAttribute('data-wow-delay')) {
        num = Number($(this)[0].parentElement.getAttribute('data-wow-delay').replace('s', ''));
      }
      $(this).append(`<span class='wow fadeInRight' data-wow-delay="${t + num}s">${word} </span>`);
      t += 0.05;
    }
  })
})();

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (500) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 60
      }, 500, 'easeOutSine', function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }
  });
});

//Particles.js
particlesJS("parts", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 4,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": .5,
      "direction": "top",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "remove"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 100,
        "size": 2.5,
        "duration": .5,
        "opacity": .75,
        "speed": 4
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

//helping email flyout effect
$('.flyout-email').hover(
  function () {
  // console.log($(this).attr('class'));
  $(this).parent().next().addClass('fadeInRight');
  }, 
  
  function () {
    $(this).parent().next().addClass('fadeOutRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => $(this).parent().next().removeClass('fadeOutRight'));
    $(this).parent().next().removeClass('fadeInRight');
  }
);

function killSpin(){
  $(".spinContainer").css("display","none")
  $(".top").css("display","initial");
}