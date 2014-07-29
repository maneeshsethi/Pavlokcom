$can_size    = 300;
$progDegrees = 327; // 90%
$howDegrees  = 1;
$can_pos = 0;
$can_start = 0;
$can_finish = 0;
$can_scrollAmmount = 0;

window.onload = function(){
	//canvas initialization
	var canvas = document.getElementById("ani_chart");
	var ctx = canvas.getContext("2d");
	//dimensions
	var W = canvas.width;
	var H = canvas.height;
	//Variables
	var degrees = 0;
	var new_degrees = 0;
	var difference = 0;
	var color = "#ffcd00"; //green looks better to me
	var bgcolor = "#000";
	var text;
	var animation_loop, redraw_loop;
	
	function init()
	{
		//Clear the canvas everytime a chart is drawn
		ctx.clearRect(0, 0, W, H);
		
		//Background 360 degree arc
		ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 39;
		ctx.arc(W/2, H/2, 100, 0, Math.PI*2, false); //you can see the arc now
		ctx.stroke();
		
		//gauge will be a simple arc
		//Angle in radians = angle in degrees * PI / 180
		var radians = degrees * Math.PI / 180;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 40;
		//The arc starts from the rightmost end. If we deduct 90 degrees from the angles
		//the arc will start from the topmost end
		ctx.arc(W/2, H/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false); 
		//you can see the arc now
		ctx.stroke();
		
		//Lets add the text
		ctx.fillStyle = color;
		ctx.font = "20px halisgr-light";
		text = Math.floor(degrees/360*100) + "%";
		//Lets center the text
		//deducting half of text width from position x
		text_width = ctx.measureText(text).width;
		//adding manual value to position y since the height of the text cannot
		//be measured easily. There are hacks but we will keep it manual for now.
		ctx.fillText(text, W/2 - 15, (H - 20) + 15);
	}
	
	function draw()
	{
		// degrees = 0;
		init();


		if(typeof animation_loop != undefined) clearInterval(animation_loop);
		
		//random degree from 0 to 360
		// new_degrees = $howDegrees;
		difference = $howDegrees - degrees;
		//This will animate the gauge to new positions
		//The animation will take 1 second
		//time for each frame is 1sec / difference in degrees
		animation_loop = setInterval(animate_to, 50/difference);
	}
	function animate_to()
	{
		//clear animation loop if degrees reaches to new_degrees
		if(degrees == $howDegrees) 
			clearInterval(animation_loop);
		
		if(degrees < $howDegrees)
			degrees++;
		else
			degrees--;
			
		init();
	}
	draw();

	$(window).scroll( function(){
	 // pie hart

		$can_pos = $(".d_chart").offset();
		$can_start = ($can_pos.top - $(window).height())+ $can_size;
		$can_finish = $can_pos.top - 80;
		$can_scrollAmmount = $can_finish - $can_start;

	  
	    calcDegrees();

	    draw();
	})

	function calcDegrees() {
	   
	    var winScroll = $(window).scrollTop();
	    if( (winScroll >= $can_start) && ($can_finish >= winScroll)) {
	        $howDegrees = Math.floor($progDegrees * ($(window).scrollTop() - $can_start) / $can_scrollAmmount);
	        if (window.addEventListener) 
                window.addEventListener('wheel DOMMouseScroll MouseWheelHandler mousewheel', wheel, false);
                window.onmousewheel = document.onmousewheel = wheel;
	    }
	    if(winScroll <= $can_start){
	    	$howDegrees = 1;
	    }
	    if($can_finish <= winScroll){
	    	$howDegrees = 327;
	    }
	     function wheel(event) {
	        var delta = 0;
	        if (event.wheelDelta) delta = event.wheelDelta / 120;
	        else if (event.detail) delta = -event.detail / 3;

	        handle(delta);
	        if (event.preventDefault) event.preventDefault();
	        event.returnValue = false;
	    }

	    function handle(delta) {
	        var time = 150;
	        var distance = 100; 
	        
	        $('html, body').stop().animate({
	            scrollTop: $(window).scrollTop() - (distance * delta)
	        }, time );
    	}

	}
}