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
    //navigation adapt
    const menu = document.querySelector(".navigation"),
        menuItems = document.querySelectorAll(".navigation a"),
        hamburger = document.querySelector(".hamburger");

    //navigation scroll
    $(window).scroll(function () {       
        if ($(this).scrollTop() > 200) {
            $(".navigation").addClass("200");
        } else {
            $(".navigation").removeClass("200");
        }
        
        if ($(this).scrollTop() > 200 && !$(".navigation").hasClass("navigation_scroll")) { // добавил 15.11.2023. Надо убедиться           
            $(".navigation").addClass("navigation_scroll");      
        } else if ($(this).scrollTop() < 200 && !hamburger.classList.contains('hamburger_active')) {
            $(".navigation").removeClass("navigation_scroll");            
        }

    });


    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("hamburger_active");
        menu.classList.toggle("navigation_active");
        if ($(".navigation").hasClass("navigation_scroll") && !hamburger.classList.contains('hamburger_active')
        && !$(".navigation").hasClass("200")
        ) {
            // console.log('Yes');
            $(".navigation").removeClass("navigation_scroll");
        } else {
            $(".navigation").addClass("navigation_scroll");
            // console.log('No');
        }
    });
    menuItems.forEach((i) => {
        i.addEventListener("click", (e) => {
            // menuItems.forEach((i) => {
            //     i.classList.remove('active')  //Понял как сделать ссылку активной после нажатия, но не понял, как правильно удалить
            // })            
            // e.target.classList.add('active')
            hamburger.classList.remove("hamburger_active");
            menu.classList.remove("navigation_active");
            if ($(".navigation").hasClass("navigation_scroll") && !hamburger.classList.contains('hamburger_active')
            && !$(".navigation").hasClass("200")
        ) {
            // console.log('Yes');
            $(".navigation").removeClass("navigation_scroll");
        }
        });
    });
    // Ниже скрипт делает плавный скролл
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function() {
                window.location.hash = hash;
            });
        }
    });
    // Ниже рабочий (кажется) вариант подсветки соответстующей блоку ссылки
// jQuery(window).scroll(function(){
//     var $sections = $('section');
// $sections.each(function(i,el){
//    var top  = $(el).offset().top-100;
//    var bottom = top +$(el).height();
//    var scroll = $(window).scrollTop();
//    var id = $(el).attr('id');
//    if( scroll > top && scroll < bottom){
//        $('a.active').removeClass('active');
//        $('a[href="#'+id+'"]').addClass('active');

//    }
// })
// });



});
