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

changeInfo();

//Variable to access database collection

async function changeInfo() {
    const userDB = (await firestore.collection("user_info").get()).docs[0].data();


    changeBlog(userDB['content']);

    changeAbout(userDB['about']);

    changeSkill(userDB);
}

function changeAbout(userAboutDB) {

    userFacebook = document.getElementsByClassName("facebook-link");
    for (var i = 0; i < userFacebook.length; i++) {
        userFacebook[i].href = userAboutDB['facebook'];
    }

    userTiktok = document.getElementsByClassName("tiktok-link");
    for (var i = 0; i < userTiktok.length; i++) {
        userTiktok[i].href = userAboutDB['tiktok'];
    }

    userInstagram = document.getElementsByClassName("instagram-link");
    for (var i = 0; i < userInstagram.length; i++) {
        userInstagram[i].href = userAboutDB['instagram'];
    }

    userYoutube = document.getElementsByClassName("youtube-link");
    for (var i = 0; i < userYoutube.length; i++) {
        userYoutube[i].href = userAboutDB['youtube'];
    }
}

function changeSkill(userDB) {
    userSkill = document.getElementById("user-skills");
    var listSkill = userDB['skills'].map(e => generateSkillItem(e['title'], e['value'], e['icon']));
    userSkill.innerHTML = '';
    userSkill.replaceChildren(...listSkill);
}

function changeService(userServiceDB) {
    userService = document.getElementById("user-services");
    var listService = userServiceDB['list'].map(e => generateServiceItem(e['title'], e['info'], e['icon']));
    userService.innerHTML = '';
    userService.replaceChildren(...listService);

    document.getElementById("service-info").innerText = userServiceDB['introduce'];

}

function changeRecentWork(userRecentWorkDB) {
    document.getElementById('recent-work-info').innerText = userRecentWorkDB['introduce'];
    document.getElementById('work-link').href = userRecentWorkDB['link'];

    userWork = document.getElementById("user-works");
    var listWork = userRecentWorkDB['posts'].map(e => generateWorkItem(e['title'], e['link'], e['image']));
    userWork.innerHTML = '';
    userWork.replaceChildren(...listWork);
}

function changeBlog(userBlogDB) {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id');
    console.log(id);
    currentBlog = userBlogDB['posts'][id];
    document.getElementById("blog-image").src = currentBlog['image'];
    document.getElementById("blog-title").innerHTML = currentBlog['title'];
    document.getElementById("blog-date").innerHTML = '<i class="lni-calendar"></i> ' + currentBlog['datePost']
    document.getElementById("blog-link").src = currentBlog['content'] + '?embedded=true';
    switch (id) {
        case '2':
            document.getElementById("blog-link").style.height = "1450px";
            break;
        case '1':
            document.getElementById("blog-link").style.height = "1550px";
            break;
        case '3':
            document.getElementById("blog-link").style.height = "1050px";
            break;
        case '4':
            document.getElementById("blog-link").style.height = "1850px";
            break;
        case '5':
            document.getElementById("blog-link").style.height = "2500px";
            break;
        case '6':
            document.getElementById("blog-link").style.height = "1050px";
            break;
        case '7':
            document.getElementById("blog-link").style.height = "1350px";
            break;
        case '8':
            document.getElementById("blog-link").style.height = "1350px";
            break;
        case '9':
            document.getElementById("blog-link").style.height = "1300px";
            break;
        case '10':
            document.getElementById("blog-link").style.height = "1000px";
            break;
        case '11':
            document.getElementById("blog-link").style.height = "1300px";
            break;
        case '12':
            document.getElementById("blog-link").style.height = "1850px";
            break;
        case '13':
            document.getElementById("blog-link").style.height = "1850px";
            break;
        case '14':
            document.getElementById("blog-link").style.height = "1300px";
            break;
        case '15':
            document.getElementById("blog-link").style.height = "1350px";
            break;
        case '16':
            document.getElementById("blog-link").style.height = "1850px";
            break;
        default:
            document.getElementById("blog-link").style.height = "900px";
    }

    userBlog = document.getElementById("user-blog");
    var listBlogDB = userBlogDB['posts'].filter(function(blog) { return blog['isActive'] == true });
    var listBlog = listBlogDB.map(e => generateBlogItem(e['title'], e['link'], e['image'], e['datePost']));
    userBlog.innerHTML = '';
    userBlog.replaceChildren(...listBlog);
}

function generateSkillItem(skill, value, icon) {
    var div = document.createElement('div');
    div.classList.add(...['column']);
    let skillHtml = `
    <div class="card" id="counter-number">
      <p><i class="fa fa-` + icon + `"></i></p>
      <h3><span class="counter-value" data-count="` + value + `">0</span>+</h3>
      <p style="color: white;">` + skill + `</p>
    </div>`;
    div.innerHTML = skillHtml.trim();
    return div;
}

function generateServiceItem(title, info, icon) {
    var div = document.createElement('div');
    div.classList.add(...['col-lg-4', 'col-md-6', 'col-sm-8']);
    let serviceHtml = '<div class="single-service text-center mt-30"><div class="service-icon"><i class="' + icon + '"></i></div><div class="service-content"><h4 class="service-title"><a href="#">' + title + '</a></h4><p>' + info + '</p></div></div> <!-- single service -->'
    div.innerHTML = serviceHtml.trim();
    return div;
}

function generateWorkItem(title, link, image) {
    var div = document.createElement('div');
    div.classList.add(...['col-lg-4', 'col-md-6', 'col-sm-6']);
    let workHtml = `<div class="single-work text-center mt-30">
    <div class="work-image">
        <img src="${image}" alt="work">
    </div>
    <div class="work-overlay">
        <div class="work-content">
            <h3 class="work-title">${title}</h3>
            <ul>
                <li><a class="image-popup" href="${image}"><i
                            class="lni-plus"></i></a></li>
                <li><a href="${link}"><i class="lni-link"></i></a></li>
            </ul>
        </div>
    </div>`;
    div.innerHTML = workHtml.trim();
    return div;
}

function generateBlogItem(title, link, image, datePost) {
    var li = document.createElement('li');
    let blogHtml = `
    <div class="single-sidebar-post d-flex">
        <div class="post-thumb">
            <a href="` + link + `"><img style="width: 70px; height: 68px;" src="` + image + `" alt="Post"></a>
        </div>
        <div class="post-content media-body">
            <h5 class="post-title"><a href="#">` + title + `</a></h5>
            <span><i class="lni-calendar"></i>  ` + datePost + `</span>
        </div>
    </div>
`;
    li.innerHTML = blogHtml.trim();
    return li;
}



(function($) {

    "use strict";

    //===== Prealoder

    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });

    //===== Mobile Menu 

    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });

    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });


    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function() {
        $(".navbar-collapse").removeClass("show");
    });


    //===== Sticky

    $(window).on('scroll', function(event) {
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
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

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
        $('.progress-line').appear(function() {
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
    $(window).on('scroll', function(event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    //===== 

}(jQuery));

(function($) {
    "use strict";
    $(window).on('load', function(event) { $('.preloader').delay(500).fadeOut(500); });
    $(".navbar-toggler").on('click', function() { $(this).toggleClass('active'); });
    $(".navbar-nav a").on('click', function() { $(".navbar-toggler").removeClass('active'); });
    $(".navbar-nav a").on('click', function() { $(".navbar-collapse").removeClass("show"); });
    $(window).on('scroll', function(event) { var scroll = $(window).scrollTop(); if (scroll < 10) { $(".navigation").removeClass("sticky"); } else { $(".navigation").addClass("sticky"); } });
    var scrollLink = $('.page-scroll');
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function() {
            var sectionOffset = $(this.hash).offset().top - 73;
            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });

    function parallaxMouse() { if ($('#parallax').length) { var scene = document.getElementById('parallax'); var parallax = new Parallax(scene); }; };
    parallaxMouse();
    if ($('.progress-line').length) {
        $('.progress-line').appear(function() {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, { accY: 0 });
    }
    $('.counter').counterUp({ delay: 10, time: 1600, });
    $('.image-popup').magnificPopup({ type: 'image', gallery: { enabled: true } });
    $(window).on('scroll', function(event) { if ($(this).scrollTop() > 600) { $('.back-to-top').fadeIn(200) } else { $('.back-to-top').fadeOut(200) } });
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0, }, 1500);
    });
}(jQuery));