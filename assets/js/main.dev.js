"use strict";

function validateForm() {
  var name = document.getElementById("inputName").value;
  var email = document.getElementById("inputEmail").value;
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
}

;

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

;
$(function () {
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
    var top = $($(this).attr("href")).offset().top - 120;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 1000);
  });
  $("#down_btn").on('click', function (e) {
    e.preventDefault();
    var top = $("#projects").offset().top - 120;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 1000);
  });
  $.ajax({
    url: "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json",
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';
      json.articles.forEach(function (news, i) {
        var newsData = (new Date(news.publishedAt) + "").split(' ');

        if (i < 10) {
          html += "<li class=\"card_news\" data-i=\"".concat(i, "\">\n                    <div class=\"news_pic\">\n                        <img data-src=\"").concat(news.urlToImage, "\" alt=\"News picture\"></div>\n                    <div class=\"news_content\">\n                        <h3>").concat(news.title, "</h3>\n                        <p>").concat(news.description, "</p>\n                        <div class=\"author\">\n                            <div class=\"avatar\"><img data-src=\"assets/images/avatar-2.png\" alt=\"Authors avatar\">\n                            </div>\n                            <div class=\"about_author\">\n                                <h5>").concat(news.author, "</h5>\n                                <p><time datetime=\"").concat(news.publishedAt.replace('T', ' '), "\"></time>").concat(newsData[2], " ").concat(newsData[1], " ").concat(newsData[3], "</p>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"cover_news\">\n                        <a href=\"").concat(news.url, "\" class=\"news_link\"\n                            target=\"_blank\"></a>\n                    </div>\n                </li>");
        }
      });
      $("#news_slider").html(html);
      var slider = $('#news_slider').lightSlider({
        item: 3,
        loop: true,
        slideMargin: 30,
        controls: false,
        responsive: [{
          breakpoint: 1100,
          settings: {
            item: 3,
            slideMargin: 20
          }
        }, {
          breakpoint: 990,
          settings: {
            item: 2,
            slideMargin: 20
          }
        }, {
          breakpoint: 700,
          settings: {
            item: 1,
            slideMargin: 20
          }
        }],
        onSliderLoad: function onSliderLoad(el) {
          var showActiveSlides = function showActiveSlides(entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
              }
            });
          };

          var imageWidth = el.find("li").outerWidth() + "px";
          var observer = new window.IntersectionObserver(showActiveSlides, {
            root: el.parent()[0],
            rootMargin: "0px " + imageWidth + " 0px " + imageWidth
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
  var headSlider = $('#header_slider').lightSlider({
    item: 1,
    loop: true,
    vertical: true,
    verticalHeight: 800,
    controls: false,
    auto: true,
    speed: 1000,
    pause: 2000,
    currentPagerPosition: 'right',
    onSliderLoad: function onSliderLoad(el) {
      var showActiveSlides = function showActiveSlides(entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      };

      var imageWidth = el.find("li").outerWidth() + "px";
      var observer = new window.IntersectionObserver(showActiveSlides, {
        root: el.parent()[0],
        rootMargin: "0px " + imageWidth + " 0px " + imageWidth
      });
      el.find("li img").each(function () {
        observer.observe(this);
      });
    }
  });
  lightGallery(document.getElementById('animated-thumbnails-gallery'), {
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
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var myIcon = L.icon({
      iconUrl: 'assets/plugins/leaflet/images/pin.png',
      iconSize: [106, 106],
      iconAnchor: [12, 41],
      popupAnchor: [41, -31]
    });
    var marker = L.marker([40.677710417735064, -73.90687103011915], {
      icon: myIcon
    }).addTo(map).bindPopup("\n        <div class=\"map_popup\">\n            <img src=\"assets/images/avatar-3.png\" alt=\"Popup avatar\">\n            <div class=\"map_info\">          \n                <span>I am here</span>\n            </div>\n        </div>\n    ");
    marker.on('click', function () {
      document.getElementById('to_google_map').click();
    });
  });
  $("#contact_form").on('submit', function (e) {
    e.preventDefault();

    if (validateForm() == false) {
      alert("Invalid form data!");
      return false;
    } // console.log("SEND FORM!");


    var BOT_TOKEN = '5060479505:AAE5--JEDUqjudIJcP82clFnIAf1HMRrjA4'; // @get_id_bot and /get_id

    var CHAT_ID = '-1001765759474';
    var text = encodeURI("<b>Name:</b> " + $("#inputName").val() + "\n<b>Email:</b> " + $("#inputEmail").val());
    $.get("https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=") + text + '&parse_mode=html', function (json) {
      if (json.ok) {
        $("#contact_form").trigger('reset');
        alert("Message successfully send");
      } else {
        alert(json.description);
      }
    });
  });
});