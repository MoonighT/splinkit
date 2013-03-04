(function(){
	init = function(){
		var event = new Event();
		event.fetch();
		var title_view = new TitleView({el : $('#title_container'), model: event });
		var subtitle_view = new SubtitleView({el : $('#subtitle_container'), model: event });
		var description_view = new DescriptionView({el : $('#description_container'), model: event });
	};

	init();
})()