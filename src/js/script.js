$(document).ready(function () {
    //background slider
    $(".promo__background").slick({
        arrows: false,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
        fade: true,
        cssEase: "linear",
        slickPause: true,
    });
    //navigation scroll
    $(window).scroll(function () {        
        if ($(this).scrollTop() > 300) {
            // console.log($(this).scrollTop())
            $(".navigation").addClass("navigation_scroll");
        } else {
            $(".navigation").removeClass("navigation_scroll");
        }
    });
});
