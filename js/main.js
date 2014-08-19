$num_frames  = 6;
$frame_dist  = 20;
$img_top     = 300;
$can_size    = 300;
$progDegrees = 328; // 90%
$howDegrees  = 0;

$(document).ready(function(){
    if (window.addEventListener) 
        window.addEventListener('wheel DOMMouseScroll MouseWheelHandler mousewheel', wheel, false);
        window.onmousewheel = document.onmousewheel = wheel;

    // $("html, body").animate({scrollTop: 1});

    $("a.youtube").YouTubePopup({ hideTitleBar: true });
    
    $(".phone-menu").click(function(){
      $(".menu-box").slideToggle("fast");
  });
    // burze
    $( window ).scroll( function() {
        //pie chart show lightning
        var can_pos = $(".d_chart").offset();
        var can_start = (can_pos.top - $(window).height())+ $can_size;
        var can_finish = can_pos.top - 80;
        var can_scrollAmmount = can_finish - can_start; 
        var show_light = can_start + ((can_scrollAmmount/100)*35)
        if($(window).scrollTop() >= show_light){
            $(".w_light").fadeIn();
            $(".cover").fadeOut(); 
            console.log(show_light)
        }else{
            $(".w_light").fadeOut();
            $(".cover").fadeIn();
        }
      // rotator

        if($(window).scrollTop() > $img_top) {
            // prodolzi normal scroll
            window.removeEventListener('wheel DOMMouseScroll MouseWheelHandler mousewheel', function(){}, false);
            window.onmousewheel = document.onmousewheel = false;
        }

        var scrollam = $(window).scrollTop();
        var move_bg  = $(".header-box-img");
        var posam    = $img_top / $num_frames;
        var pos      = Math.floor(scrollam / posam);
        var amm      = ($frame_dist * pos);
        if(pos < 6){
            move_bg.css({"background-position": amm + '%' + "0px"});
        }

       
    //rotator
    });

    function wheel(event) {
        var delta = 0;
        if (event.wheelDelta) delta = event.wheelDelta / 120;
        else if (event.detail) delta = -event.detail / 3;

        handle(delta);
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
    }

    function handle(delta) {
        var time = 100;
        var distance = 50; 
        
        $('html, body').stop().animate({
            scrollTop: $(window).scrollTop() - (distance * delta)
        }, time );
    }

    $(".slider1").bxSlider({controls:false, pagerCustom: '#bx-pager', touchEnabled: true});

    $(".slider2").bxSlider({pager: false, mode: "fade", speed: 700, adaptiveHeight: true});


    $( window ).resize(function() {
        // burze rotation responsive
        var eqW = $(".header-box-img").width();
        $(".header-box-img").css({"height": eqW})
    });
        

// burze validate subscribe
    $(".sub_in.btn").click(function(){
        var email = $('.email').val();
        if (validateEmail(email)) {
            $(".alert_subscribe").hide();
            return true;
        }
        else {
            $(".alert_subscribe").show();
            return false;
        }
    });

    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
// burze rotation responsive
    var eqW = $(".header-box-img").width();
    $(".header-box-img").css({"height": eqW})
    
// burze 
}); //doc is reddy

$(window).load(function() {
        $('#slider').nivoSlider();
    });

$('#slider-nivo').nivoSlider({
    effect: 'fade',               // Specify sets like: 'fold,fade,sliceDown'
    animSpeed: 500,                 // Slide transition speed
    pauseTime: 30000,                // How long each slide will show
    startSlide: 0,                  // Set starting Slide (0 index)
    directionNav: false,             // Next & Prev navigation
    controlNav: true,               // 1,2,3... navigation
    controlNavThumbs: false,        // Use thumbnails for Control Nav
    pauseOnHover: false,             // Stop animation while hovering
    manualAdvance: false,           // Force manual transitions
    prevText: 'Prev',               // Prev directionNav text
    nextText: 'Next',               // Next directionNav text
    randomStart: false,             // Start on a random slide
    slideshowEnd: function(){},     // Triggers after all slides have been shown
    lastSlide: function(){},        // Triggers when last slide is shown
    afterLoad: function(){
        $('.custom-thumb').first().addClass('active');
        $(".custom-thumb").click(function(e) {
            $('.custom-thumb').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
            var targetSlide = $(this).attr("data-ref");
            $('.nivo-control[rel="'+targetSlide+'"]').trigger("click");

        });
    },         // Triggers when slider has loaded
    beforeChange: function(){

    },   // Triggers before a slide transition
    afterChange: function(){
        var rel = $('.nivo-control.active').attr('rel');
        $('.custom-thumb').removeClass('active');
        $('.custom-thumb[data-ref="'+rel+'"]').addClass('active');
    }        // Triggers after a slide transition
});

$('.feat-btn').hover(function(){
    var p = $(this).parents('.feat-holder');
    $('.block-5-info',p).show();
},function(){
    var p = $(this).parents('.feat-holder');
    $('.block-5-info',p).hide();
});
