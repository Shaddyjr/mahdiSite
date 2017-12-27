//for new_index.html
let effect = 4; //parallax effect

$(document).ready(function(){
    //materialize
    $('.parallax').parallax();

    // taken from http://abduzeedo.com/node/75046 and modified
    $(window).scroll(function(){
        // on window scroll translate .para-img y by 1/3
        let x = $(this).scrollTop();
        $(".para-img").css("transform",`translate(0, ${x/effect}px)`);
    })
  });
      