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

    changeAbout(userDB['about']);

    changeService(userDB['service']);

    changeRecentWork(userDB['recent_work']);

    changeBlog(userDB['content']);

    changeLearing(userDB['learning']);

    changeSkill(userDB);

    changeTimeline(userDB['timeline']);
}

function changeTimeline(userTimelineDB){
    userTimeline = document.getElementById("timeline");
    var listTimelineDB = userTimelineDB['items'].filter(function (timeline) { return timeline['isActive'] == true });
    var listTimeline = listTimelineDB.map(e => generateTimelineItem(e['title'], e['year'], e['image'], e['content']));
    userTimeline.innerHTML = '';
    userTimeline.replaceChildren(...listTimeline);
}

function changeAbout(userAboutDB) {
    userName = document.getElementsByClassName("user-name");
    for (var i = 0; i < userName.length; i++) {
        userName[i].innerText = userAboutDB['name'];
    }

    // userJob = document.getElementById("user-job");
    // userJob.innerHTML = userAboutDB['job'];

    userAvatar = document.getElementById("user-avatar");
    userAvatar.src = userAboutDB['avatar'];

    userYoutube = document.getElementById('youtube-video');
    listArray = userAboutDB['youtube_video'].split('/')
    youtubeId = listArray[listArray.length - 1];
    userYoutube.innerHTML = `<iframe src="${userAboutDB['youtube_video']}?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=${youtubeId}&rel=0"></iframe>`

    userAboutDetail = document.getElementsByClassName("user-about-detail");
    for (var i = 0; i < userAboutDetail.length; i++) {
        userAboutDetail[i].innerHTML = userAboutDB['introduce_detail'];
    }

    userAboutDetail = document.getElementsByClassName("user-footer");
    for (var i = 0; i < userAboutDetail.length; i++) {
        userAboutDetail[i].innerHTML = userAboutDB['footer'];
    }

    userAboutShort = document.getElementById("user-about-short");
    userAboutShort.innerHTML = userAboutDB['introduce_short'];

    // userDob = document.getElementById("user-dob");
    // userDob.innerText = userAboutDB['dob'];

    userEmail = document.getElementsByClassName("user-email");
    for (var i = 0; i < userEmail.length; i++) {
        userEmail[i].innerHTML = userAboutDB['email'];
    }

    userPhone = document.getElementsByClassName("user-phone");
    for (var i = 0; i < userPhone.length; i++) {
        userPhone[i].innerHTML = userAboutDB['phone'];
    }

    userLocation = document.getElementsByClassName("user-location");
    for (var i = 0; i < userLocation.length; i++) {
        userLocation[i].innerHTML = userAboutDB['location'];
    }

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
    var listService = userServiceDB['list'].map((e, id)=> generateServiceItem(e['title'], e['info'], e['icon'], e['image'], id));
    userService.innerHTML = '';
    userService.replaceChildren(...listService);

    document.getElementById("service-info").innerHTML = userServiceDB['introduce'];

}

function changeRecentWork(userRecentWorkDB) {
    document.getElementById('recent-work-info').innerHTML = userRecentWorkDB['introduce'];


    userWork = document.getElementById("user-works");
    var listWorkDB = userRecentWorkDB['posts'].filter(function (work) { return work['isActive'] == true });
    var listWork = listWorkDB.map(e => generateWorkItem2(e['title'], e['link'], e['image']));
    userWork.innerHTML = '';
    userWork.replaceChildren(...listWork);
}

function changeBlog(userBlogDB) {
    document.getElementById('blog-info').innerHTML = userBlogDB['introduce'];

    userBlog = document.getElementById("user-blog");
    var listBlogDB = userBlogDB['posts'].filter(function (blog) { return blog['isActive'] == true });
    var listBlog = listBlogDB.map(e => generateBlogItem(e['title'], e['link'], e['image'], e['datePost']));
    userBlog.innerHTML = '';
    userBlog.replaceChildren(...listBlog);
}

function changeLearing(userLearningDB) {
    document.getElementById('learning-info').innerHTML = userLearningDB['introduce'];

    userLearning = document.getElementById("user-learning");
    var listLearningDB = userLearningDB['posts'].filter(function (learning) { return learning['isActive'] == true });
    var listLearning = listLearningDB.map(e => generateLearningItem(e['title'], e['link'], e['image']));
    userLearning.innerHTML = '';
    userLearning.replaceChildren(...listLearning);
}

function generateSkillItem(skill, value, icon) {
    var div = document.createElement('div');
    div.classList.add(...['column']);
    let skillHtml = `
    <div class="card" id="counter-number">
      <p><i class="fa fa-`+ icon + `"></i></p>
      <h3><span class="counter-value" data-count="`+ value + `">0</span>+</h3>
      <p style="color: white;">`+ skill + `</p>
    </div>`;
    div.innerHTML = skillHtml.trim();
    return div;
}

function generateTimelineItem(title, year, image, content){
    var div = document.createElement('div');
    div.classList.add(...['tl-item'])
    let timelineHtml = `<div class="tl-bg" style="background-image: url(${image})"></div>
    <div class="tl-year">
        <p class="f2 heading--sanSerif">${year}</p>
    </div>
    <div class="tl-content">
        <h1>${title}</h1>
        <p>${content}</p>
    </div>`
    div.innerHTML = timelineHtml.trim();
    return div;
}

function generateServiceItem(title, info, icon, image, id) {
    var div = document.createElement('div');
    div.classList.add(...['col-lg-4', 'col-md-6', 'col-sm-8', 'mt-30']);
    let serviceHtml =
        `<div class="service-background  mt-30" style="background-image: url('${image}')">
            <div class="single-service text-center">
                <div>
                <div class="service-icon">
                    <i class="` + icon + `"></i>
                </div>
                <div class="service-content">
                    <h4 class="service-title">
                        <div >` + title + `</div>
                    </h4>
                    <p>` + info + `</p>
                </div>
                </div>
                <a class="main-btn" href="work-details.html?id=${id}" target="_blank"><span>Tìm hiểu ngay</span></div>
            </div>
        </div> <!-- single service -->`
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
            <h3 class="work-title" style="padding: 5px">${title}</h3>
            <ul>
                <li><a class="image-popup" target="_blank" href="${image}"><i
                            class="lni-plus"></i></a></li>
                <li><a href="${link}" target="_blank"><i class="lni-link"></i></a></li>
            </ul>
        </div>
    </div>`;
    div.innerHTML = workHtml.trim();
    return div;
}

function generateWorkItem2(title, link, image) {
    var div = document.createElement('div');
    div.classList.add(...['col-lg-4', 'col-md-8', 'col-sm-9']);
    let workHtml = `<div class="single-work mt-30">
    <div class="work-image">
        <img src="${image}" alt="Blog">
    </div>
    <div class="work-content">
        <h4 class="work-title"><a href="${link}" target="_blank">${title}</a></h4>
        
    </div>
    </div>`;
    div.innerHTML = workHtml.trim();
    return div;
}

function generateBlogItem(title, link, image, datePost) {
    var div = document.createElement('div');
    div.classList.add(...['col-lg-4', 'col-md-8', 'col-sm-9']);
    let blogHtml = `<div class="single-blog mt-30">
    <div class="blog-image">
        <img src="${image}" alt="Blog">
    </div>
    <div class="blog-content">
        <h4 class="blog-title"><a href="${link}" target="_blank">${title}</a></h4>
        <span>${datePost}</span>
    </div>
    </div>`;
    div.innerHTML = blogHtml.trim();
    return div;
}

function generateLearningItem(title, link, image) {
    var div = document.createElement('div');
    div.classList.add(...['col-lg-4', 'col-md-8', 'col-sm-9']);
    let learingHtml = `<div class="single-learning mt-30">
    <div class="learning-image">
        <img src="${image}" alt="learning">
    </div>
    <div class="learning-content">
        <h4 class="learning-title"><a href="${link}" target="_blank">${title}</a></h4>
    </div>
    </div>`;

    if(link == undefined || link==""){
        learingHtml = `<div class="single-learning mt-30">
    <div class="learning-image">
        <img src="${image}" alt="learning">
    </div>
    <div class="learning-content">
        <h4 class="learning-title"><a >${title}</a></h4>
    </div>
    </div>`;
    }
    div.innerHTML = learingHtml.trim();
    return div;
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

(function ($) {
    "use strict"; $(window).on('load', function (event) { $('.preloader').delay(500).fadeOut(500); }); $(".navbar-toggler").on('click', function () { $(this).toggleClass('active'); }); $(".navbar-nav a").on('click', function () { $(".navbar-toggler").removeClass('active'); }); $(".navbar-nav a").on('click', function () { $(".navbar-collapse").removeClass("show"); }); $(window).on('scroll', function (event) { var scroll = $(window).scrollTop(); if (scroll < 10) { $(".navigation").removeClass("sticky"); } else { $(".navigation").addClass("sticky"); } }); var scrollLink = $('.page-scroll'); $(window).scroll(function () { var scrollbarLocation = $(this).scrollTop(); scrollLink.each(function () { var sectionOffset = $(this.hash).offset().top - 73; if (sectionOffset <= scrollbarLocation) { $(this).parent().addClass('active'); $(this).parent().siblings().removeClass('active'); } }); }); function parallaxMouse() { if ($('#parallax').length) { var scene = document.getElementById('parallax'); var parallax = new Parallax(scene); }; }; parallaxMouse(); if ($('.progress-line').length) { $('.progress-line').appear(function () { var el = $(this); var percent = el.data('width'); $(el).css('width', percent + '%'); }, { accY: 0 }); }
    $('.counter').counterUp({ delay: 10, time: 1600, }); $('.image-popup').magnificPopup({ type: 'image', gallery: { enabled: true } }); $(window).on('scroll', function (event) { if ($(this).scrollTop() > 600) { $('.back-to-top').fadeIn(200) } else { $('.back-to-top').fadeOut(200) } }); $('.back-to-top').on('click', function (event) { event.preventDefault(); $('html, body').animate({ scrollTop: 0, }, 1500); });
}(jQuery));