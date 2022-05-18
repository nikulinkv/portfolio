import * as flsFunctions from "./modules/functions.js";
import jQuery from "jquery";
import owlCarousel from "owl.carousel"

flsFunctions.isWebp();
flsFunctions.smoothScroll();
flsFunctions.modal();

(function () {

    const iconMenu = document.querySelector('.menu__icon');
    const headerMenu = document.querySelector('.menu');

    if (iconMenu) {
        iconMenu.addEventListener("click", function (e) {
            iconMenu.classList.toggle('active');
            headerMenu.classList.toggle('active');
            if (headerMenu.classList.contains('active')) {
                disableScroll();
            } else {
                enableScroll();
            };
        });
        document.querySelectorAll('.menu__link').forEach(function (itemMenu) {
            itemMenu.addEventListener("click", function () {
                iconMenu.classList.remove('active');
                headerMenu.classList.remove('active');
                enableScroll();
            });
        });
    };

    window.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll("span[id^=icon]").forEach(function (flyIcons) {
            flyIcons.classList.add('icon_fly');
        }
        )
    })

    $(".owl-carousel").owlCarousel({
        loop: !0,
        margin: 50,
        autoplay: !0,
        smartSpeed: 2e3,
        autoplayTimeout: 6e3,
        autoplayHoverPause: !0,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            991: {
                items: 3
            }
        }
    });

    var owl = $(".owl-carousel");
    owl.owlCarousel();
    $(".arrow-right").on("click", (function () {
        owl.trigger("next.owl.carousel")
    })),
        $(".arrow-left").on("click", (function () {
            owl.trigger("prev.owl.carousel", [300])
        }));
}())