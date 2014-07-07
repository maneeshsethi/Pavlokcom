$(document).ready(function(){
    

    $(".phone-menu").click(function(){
      $(".menu-box").slideToggle("fast");
  });
  
});

$(window).load(function() {
        $('#slider').nivoSlider();
    });

$('#slider').nivoSlider({
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
