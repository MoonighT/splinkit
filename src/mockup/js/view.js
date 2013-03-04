(function(){

	window.TitleView = Backbone.View.extend({
		initialize: function(){		
			_.bindAll(this, "render");
	        this.model.bind('change', this.render);
		},
		render: function(){
			var attr = this.model.attributes;
			var template = _.template( $('#title_template').html(), {title: attr.name} );
			this.$el.html(template);
		},
		events: {
			"click #edit-title" : "edit_title"
		},
		edit_title: function(e){
			var model = this.model;
			var attr = this.model.attributes;
			$('#event_title_form').reveal({
				dismissModalClass: 'reveal-close',
			});
			$('#event_title').attr('value',attr.name);
			$('.save').click(function(){
				model.set({'name': $('#event_title').val()});
			});
		},
	});

	window.SubtitleView = Backbone.View.extend({
		initialize: function(){		
			_.bindAll(this, "render");
	        this.model.bind('change', this.render);
		},
		render: function(){
			var attr = this.model.attributes;
			var template = _.template( $('#subtitle_template').html(), {start_date: timeConverter(attr.start_date), location: attr.location} );
			this.$el.html(template);
		},
		events: {
			"click #edit-subtitle" : "edit_subtitle"
		},
		edit_subtitle: function(e){
			var model = this.model;
			var attr = this.model.attributes;
			$('#event_subtitle_form').reveal({
				dismissModalClass: 'reveal-close',
			});
			$('#event_location1').attr('value',attr.location);
			var time = attr.start_date;
			var date = new Date(time*1000);
	  	    
	  		var d = date.getDate();
		    var mm = date.getMonth()+1;
			if(mm < 10) 
				mm = "0" + mm;
			if(d < 10) 	  	
     	       d = "0" + d;
			var yyyy = date.getFullYear();
			var date = yyyy+'-'+mm+'-'+d;
			console.log(date);
			$('#event_date').attr('value',date);
			$('.save').click(function(){
				model.set({'location': $('#event_location1').val()});
				var date = new Date($('#event_date').val());
				model.set({'start_date' : date.getTime()/1000});
			});
		}
	});

	window.DescriptionView = Backbone.View.extend({
		initialize: function(){		
			_.bindAll(this, "render");
	        this.model.bind('change', this.render);
		},
		render: function(){
			var attr = this.model.attributes;
			var template = _.template( $('#description_template').html(), {description: attr.description} );
			this.$el.html(template);
		},
		events: {
			"click #edit-description" : "edit_description"
		},
		edit_description: function(e){
			var model = this.model;
			var attr = this.model.attributes;
			$('#event_description_form').reveal({
				dismissModalClass: 'reveal-close',
			});
			var text = attr.description.replace(/<br\s*[\/]?>/gi, "\n");
			$('#event_description').attr('value',text);
			$('.save').click(function(){
				var content = $('#event_description').val().replace(/\n\r?/g, '<br />');
				model.set({'description': content});
			});
		},
	});
	

})();