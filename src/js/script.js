document.addEventListener('DOMContentLoaded', () => {

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
    function navScroll() {       
        if ($(this).scrollTop() > 200) {
            $(".navigation").addClass("200");
        } else {
            $(".navigation").removeClass("200");
        }

        if (
            $(this).scrollTop() > 200 &&
            !$(".navigation").hasClass("navigation_scroll")
        ) {
            // добавил 15.11.2023. Надо убедиться
            $(".navigation").addClass("navigation_scroll");
        } else if (
            $(this).scrollTop() < 200 &&
            !hamburger.classList.contains("hamburger_active")
        ) {
            $(".navigation").removeClass("navigation_scroll");
        }
    }
    navScroll();
    $(window).scroll(navScroll);

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("hamburger_active");
        menu.classList.toggle("navigation_active");
        if (
            $(".navigation").hasClass("navigation_scroll") &&
            !hamburger.classList.contains("hamburger_active") &&
            !$(".navigation").hasClass("200")
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
            hamburger.classList.remove("hamburger_active");
            menu.classList.remove("navigation_active");
            if (
                $(".navigation").hasClass("navigation_scroll") &&
                !hamburger.classList.contains("hamburger_active") &&
                !$(".navigation").hasClass("200")
            ) {
                $(".navigation").removeClass("navigation_scroll");
            }
        });
    });
    // Ниже скрипт делает плавный скролл
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                400,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });
    // Ниже рабочий вариант подсветки соответстующей блоку ссылки
    jQuery(window).scroll(function(){
        const $sections = $('section');
        $sections.each(function(i,el){
            const top  = $(el).offset().top-100;
            const bottom = top +$(el).height();
            const scroll = $(window).scrollTop();
            const id = $(el).attr('id');
            if( scroll > top && scroll < bottom){
                $('a.active').removeClass('active');
                $('a[href="#'+id+'"]').addClass('active');
            }
        })
    });

    

    // Галлерея

    const galleryItems = document.querySelectorAll(".gallery__item");
    galleryItems.forEach((popup) =>
        popup.addEventListener("click", () => {
            popup.classList.toggle("active");
            if (popup.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        })
    );

    const coffeMenu = document.querySelector(".menu__items"),
        prev = document.querySelector(".menu__btn_prev"),
        next = document.querySelector(".menu__btn_next");
    let degrees = 0,
        persp = 2300,
        x1 = null,
        y1 = null;

    function turnMenu(num) {       
        if (num) {
            degrees += num;
        }
        if (document.documentElement.clientWidth > 576 && document.documentElement.clientWidth <= 767) {
            persp = 2000; 
        } else if (document.documentElement.clientWidth <= 576) {
            persp = 10000;
        } else {
            persp = 2300;
        }
        coffeMenu.style = `transform: scale(.5) perspective(${persp}px) rotateY(${degrees}deg)`;
    }
    turnMenu(-60);
    window.addEventListener('orientationchange', () => {
        // console.log('orientationchange');
        const activeLink = document.querySelector('.navigation ul a.active').dataset.link;
        const elem = document.querySelector(`#${activeLink}`);
        // console.log(elem);        
        setTimeout(() => {        
            elem.scrollIntoView();  
        }, 50);  
                
        setTimeout(() => {            
            turnMenu();    
        }, 500);               
    });
    prev.addEventListener('click', () => {
        turnMenu(60);
    });
    next.addEventListener('click', () => {
        turnMenu(-60);
    });



    coffeMenu.addEventListener('touchstart', (e) => {        
        x1 = e.touches[0].clientX;
        y1 = e.touches[0].clientY;
    });
    coffeMenu.addEventListener('touchmove', (e) => {
        if (!x1 || !y1) {
            return false;
        }
        let x2 = e.touches[0].clientX,
            y2 = e.touches[0].clientY;

        let xDiff = x2 - x1,
            yDiff = y2 - y1;
        
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            console.log('horiz');
            if(xDiff > 0) {
                turnMenu(60); 
            } else {
                turnMenu(-60);
            }
        } 
        x1 = null;
        y1 = null;
    });

});
