(function(){
	window.Activity = Backbone.Model.extend({
		initialize : function(){
			this.time = this.get('time');
			this.topic = this.get('topic');
			this.description = this.get('description');
			this.program_id = this.get('program_id');
		} 
	});
	window.Activities = Backbone.Collection.extend({model:Activity});

	window.Program = Backbone.Model.extend({
		initialize : function(){
			this.name = this.get('name');
			this.event_id = this.get('event_id');
			this.activities = new Activities(this.get('activities'));
		}

	});
	window.Programs = Backbone.Collection.extend({model:Program});

	window.Speaker = Backbone.Model.extend({
		initialize : function(){
			this.name = this.get('name');
			this.position = this.get('position');
			this.description = this.get('description');
			this.event_id = this.get('event_id');
		}
	});
	window.Speakers = Backbone.Collection.extend({model:Speaker});

	window.Photo = Backbone.Model.extend({
		initialize : function(){
			this.content = this.get('content');
			this.event_id = this.get('event_id');

		}
	});
	window.Photos = Backbone.Collection.extend({model:Photo});

	window.Event = Backbone.Model.extend({
		initialize : function(){
			_.bindAll(this,'fetch_success');
			this.bind('change', this.fetch_success);
			
		},
		url : function(){
			return "js/event.php";
		},
		fetch_success : function(){
			this.id = this.get('id'),
			this.name = this.get('name'),
			this.start_date = this.get('start_date'),
			this.end_date = this.get('end_date'),
			this.description = this.get('description'),
			this.location = this.get('location'),
			this.programs = new Programs(this.get('programs')),
			this.speakers = new Speakers(this.get('speakers')),
			this.photos = new Photos(this.get('photos'))
		}
	});
})();
