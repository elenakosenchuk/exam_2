function validateForm() {
    let name = $("#inputName").val();
    let email = $("#inputEmail").val();
    $("#inputName").removeClass('error');
    $("#inputEmail").removeClass('error');
    if (name == "") {
        $("#inputName").addClass('error');
        return false;
    }
    if (ValidateEmail(email) == false) {
        $("#inputEmail").addClass('error');
        return false;
    }
    return true;
};

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
};


$(function () {
    $('.lazy').Lazy();
    $('.lazy-bg').Lazy();
    $("#inputName").on('focus', function () {
        $("#inputName").removeClass('error');
    });
    $("#inputEmail").on('focus', function () {
        $("#inputEmail").removeClass('error');
    });

    $(".hamburger, #page_overlay").on('click', function () {
        $(".hamburger").toggleClass("is-active");
        $("body").toggleClass("open");
    });

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 0) {
            if (!$("header").hasClass("scrolled")) {
                $("header").addClass("scrolled");
            }
        } else {
            if ($("header").hasClass("scrolled")) {
                $("header").removeClass("scrolled");
            }
        }
    });


    $("#main_menu a").on('click', function (e) {
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top - 120;
        $("html, body").animate({
            scrollTop: top + 'px'
        }, 1000);
    });

    $("#down_btn").on('click', function (e) {
        e.preventDefault();
        const top = $("#projects").offset().top - 120;
        $("html, body").animate({
            scrollTop: top + 'px'
        }, 1000);
    });

    $.ajax({
        url: `https://saurav.tech/NewsAPI/top-headlines/category/health/in.json`,
        type: 'get',
        dataType: 'json',
        success: function (json) {
            let html = '';
            json.articles.forEach((news, i) => {
                let newsData = (new Date(news.publishedAt) + "").split(' ');
                if (i < 10) {
                    html += `<li class="card_news" data-i="${i}">
                    <div class="news_pic">
                        <img data-src="${news.urlToImage}" alt="News picture"></div>
                    <div class="news_content">
                        <h3>${news.title}</h3>
                        <p>${news.description}</p>
                        <div class="author">
                            <div class="avatar"><img data-src="assets/images/avatar-2.png" alt="Authors avatar">
                            </div>
                            <div class="about_author">
                                <h5>${news.author}</h5>
                                <p><time datetime="${news.publishedAt.replace('T', ' ')}"></time>${newsData[2]} ${newsData[1]} ${newsData[3]}</p>
                            </div>
                        </div>
                    </div>
                    <div class="cover_news">
                        <a href="${news.url}" class="news_link"
                            target="_blank"></a>
                    </div>
                </li>`;
                }
            });
            $("#news_slider").html(html);
            let slider = $('#news_slider').lightSlider({
                item: 3,
                loop: true,
                slideMargin: 30,
                controls: false,
                responsive: [{
                        breakpoint: 1100,
                        settings: {
                            item: 3,
                            slideMargin: 20,
                        }
                },
                {                    
                        breakpoint: 990,
                        settings: {
                            item: 2,
                            slideMargin: 20,
                        }
                    },
                    {                    
                        breakpoint: 700,
                        settings: {
                            item: 1,
                            slideMargin: 20,
                        }
                    }
                    
                ],
                onSliderLoad: function (el) {
                    var showActiveSlides = function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                entry.target.src = entry.target
                                    .dataset.src;
                                observer.unobserve(entry.target);
                            }
                        });
                    };

                    var imageWidth = el.find("li").outerWidth() + "px";

                    var observer = new window.IntersectionObserver(
                        showActiveSlides, {
                            root: el.parent()[0],
                            rootMargin: "0px " + imageWidth + " 0px " +
                                imageWidth
                        });

                    el.find("li img").each(function () {
                        observer.observe(this);
                    });
                }
            });
            $(".prev").on('click', function () {
                slider.goToPrevSlide();
            });
            $(".next").on('click', function () {
                slider.goToNextSlide();
            });
        }

    });

    let headSlider = $('#header_slider').lightSlider({
        item: 1,
        loop: true,
        vertical: true,
        verticalHeight: 800,
        controls: false,
        auto: true,
        speed: 1000,
        pause: 2000,
        currentPagerPosition: 'right',
        onSliderLoad: function (el) {
            var showActiveSlides = function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.src = entry.target
                            .dataset.src;
                        observer.unobserve(entry.target);
                    }
                });
            };

            var imageWidth = el.find("li").outerWidth() + "px";

            var observer = new window.IntersectionObserver(
                showActiveSlides, {
                    root: el.parent()[0],
                    rootMargin: "0px " + imageWidth + " 0px " +
                        imageWidth
                });

            el.find("li img").each(function () {
                observer.observe(this);
            });
        }
    });

    lightGallery($('#animated-thumbnails-gallery')[0], {
        thumbnail: true,
        autoplayFirstVideo: false,
        pager: false,
        galleryId: "nature",
        plugins: [lgZoom, lgThumbnail],
        mobileSettings: {
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false
        }
    });
    

    $("#init_map").on('click', function () {
        $(this).remove();
        var map = L.map('my_map').setView([40.677710417735064, -73.90687103011915], 15);

        L.tileLayer(
            'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

        var myIcon = L.icon({
            iconUrl: 'assets/plugins/leaflet/images/pin.png',
            iconSize: [106, 106],
            iconAnchor: [12, 41],
            popupAnchor: [41, -31]
        });

        const marker = L.marker([40.677710417735064, -73.90687103011915], {
                icon: myIcon
            }).addTo(map)
            .bindPopup(`
        <div class="map_popup">
            <img src="assets/images/avatar-3.png" alt="Popup avatar">
            <div class="map_info">          
                <span>I am here</span>
            </div>
        </div>
    `);

        marker.on('click', function () {
            document.getElementById('to_google_map').click();
        })

    });

    $("#contact_form").on('submit', function (e) {
        e.preventDefault();
        if (validateForm() == false) {
            alert("Invalid form data!");
            return false;
        }
        // console.log("SEND FORM!");
        const BOT_TOKEN = '5060479505:AAE5--JEDUqjudIJcP82clFnIAf1HMRrjA4';
        // @get_id_bot and /get_id
        const CHAT_ID = '-1001765759474';
        let text = encodeURI("<b>Name:</b> " + $("#inputName").val() +
            "\n<b>Email:</b> " + $("#inputEmail").val()
        );

        $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` +
            text +
            '&parse_mode=html', (json) => {
                if (json.ok) {
                    $("#contact_form").trigger('reset');
                    alert("Message successfully send");
                } else {
                    alert(json.description);
                }
            });
    });
});