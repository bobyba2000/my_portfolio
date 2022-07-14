const firebaseConfig = {
    apiKey: "AIzaSyD6lZiWJA6qP-ZsWQ6PZXoVSj-ZhPFfOV4",
    authDomain: "dung-sportfolio.firebaseapp.com",
    projectId: "dung-sportfolio",
    storageBucket: "dung-sportfolio.appspot.com",
    messagingSenderId: "374081632563",
    appId: "1:374081632563:web:b373ffce991f9a9adb2646"
};

firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

changeName();

//Variable to access database collection

async function changeName() {
    const userDB = await firestore.collection("user_info").get();
    userName = document.getElementsByClassName("user-name");  // Find the elements
    for (var i = 0; i < userName.length; i++) {
        userName[i].innerText = userDB.docs[0].data()['name'];    // Change the content
    }

    userJob = document.getElementById("user-job");
    userJob.innerText = userDB.docs[0].data()['job'];

    userAvatar = document.getElementById("user-avatar");
    userAvatar.src = userDB.docs[0].data()['avatar'];
}


(function ($) {

    "use strict";

    //===== Prealoder

    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });


    //===== Mobile Menu 

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass('active');
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });


    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });


    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navigation").removeClass("sticky");
        } else {
            $(".navigation").addClass("sticky");
        }
    });


    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });



    // Parallaxmouse js

    function parallaxMouse() {
        if ($('#parallax').length) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        };
    };
    parallaxMouse();


    //===== Progress Bar

    if ($('.progress-line').length) {
        $('.progress-line').appear(function () {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, { accY: 0 });
    }


    //===== Counter Up

    $('.counter').counterUp({
        delay: 10,
        time: 1600,
    });


    //===== Magnific Popup

    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });


    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    //===== 














}(jQuery));