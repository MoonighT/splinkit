$(document).foundationTabs();
$(document).foundationTopBar();
$(window).load(function() {
	$('#featured').orbit({
		animation: 'fade',                  // fade, horizontal-slide, vertical-slide, horizontal-push
		animationSpeed: 2000,                // how fast animtions are
		timer: false, 			 // true or false to have the timer
		resetTimerOnClick: false,           // true resets the timer instead of pausing slideshow progress
		advanceSpeed: 4000, 		 // if timer is enabled, time between transitions 
		pauseOnHover: false, 		 // if you hover pauses the slider
		startClockOnMouseOut: false, 	 // if clock should start on MouseOut
		startClockOnMouseOutAfter: 1000, 	 // how long after MouseOut should the timer start again
		directionalNav: false, 		 // manual advancing directional navs
		captions: false, 			 // do you want captions?
		captionAnimation: 'fade', 		 // fade, slideOpen, none
		captionAnimationSpeed: 800, 	 // if so how quickly should they animate in
		bullets: false,			 // true or false to activate the bullet navigation
		bulletThumbs: false,		 // thumbnails for the bullets
		bulletThumbLocation: '',		 // location from this file where thumbs will be
		afterSlideChange: function(){}, 	 // empty function 
		fluid: false                         // or set a aspect ratio for content slides (ex: '4x3') 
	});
});