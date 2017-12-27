$(function() {
    $(".type2").typed({
        strings: ["Person^2000","Coder^2000","Learner^2000","Developer^2000","Teacher^2000"],
        typeSpeed: 400,
        loop: true,
    });

    //on click, toggles content between visible/non-visable, color of arrows and method
    $(".collapsed, .expanded").on("click",function(){
        let x = $(this);
        x.toggleClass("collapsed").toggleClass("expanded");
        x.parent().find(".line:not(:first):not(:last)").slideToggle("fast");
    })
});