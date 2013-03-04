(function($){

  window.Activity = Backbone.Model.extend({
    initialize : function(){
      this.id = this.get('id');
      this.time = this.get('time');
      this.topic = this.get('topic');
      this.description = this.get('description');
      this.program_id = this.get('program_id');
    } 
  });
  window.Activities = Backbone.Collection.extend({model:Activity});

  window.Program = Backbone.Model.extend({
    initialize : function(){
      this.id = this.get('id');
      this.name = this.get('name');
      this.event_id = this.get('event_id');
      this.activities = new Activities(this.get('activities'));
    }

  });
  window.Programs = Backbone.Collection.extend({model:Program});

  window.Speaker = Backbone.Model.extend({
    initialize : function(){
      this.id = this.get('id');
      this.name = this.get('name');
      this.position = this.get('position');
      this.description = this.get('description');
      this.event_id = this.get('event_id');
      this.photo_url = this.get('photo_url');
    }
  });
  window.Speakers = Backbone.Collection.extend({model:Speaker});

  window.Registration = Backbone.Model.extend({
    initialize : function(){
      this.id = this.get('id');
      this.name = this.get('name');
    }
  });
  window.Registrations = Backbone.Collection.extend({ model:Registration });

  window.Photo = Backbone.Model.extend({
    initialize : function(){
      this.content = this.get('content');
      this.event_id = this.get('event_id');

    }
  });
  window.Photos = Backbone.Collection.extend({model:Photo});



  window.Event = Backbone.Model.extend({
    initialize : function(){
      //_.bindAll(this,'fetch_success');
      this.bind('change', this.fetch_success);
      this.fetch_success();
    },
    url : function(){
      var href = window.location.href;
      var index = href.lastIndexOf('/');
      var url='';
      if(index>=30)
        url = href.substr(0,index)+'.json?details=all';
      return url;
    },
    fetch_success : function(){
      this.id = this.get('id'),
      this.name = this.get('name'),
      this.start_date = this.get('start_date'),
      this.end_date = this.get('end_date'),
      this.description = this.get('description'),
      this.location = this.get('location'),
      this.venue = this.get('venue'),
      this.organizer = this.get('organizer'),
      this.organizer_desc = this.get('organizer_desc'),
      this.programs = new Programs(this.get('programs')),
      this.speakers = new Speakers(this.get('speakers')),
      this.photos = new Photos(this.get('photos')),
      this.registration_types = new Registrations(this.get('registration_types'));
    }
  });

  window.OrganizerView = Backbone.View.extend({
    initialize: function(){   
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
      this.render();
    },
    render: function(){
      var attr = this.model.attributes;
      var template = _.template( $('#organizer_template').html(), { organizer: attr.organizer, organizer_desc: attr.organizer_desc} );
      this.$el.html(template);
    },
    events: {
      "click #edit-organizer" : "edit_organizer"
    },
    edit_organizer: function(e){
      var model = $event;
      var attr = model.attributes;
      $('#event_organizer_form').reveal({
        dismissModalClass: 'reveal-close',
      });
      $('#organizer_error').hide();
      $('#organizer_desc_error').hide();
      $('#organizer_name').val(attr.organizer);
      $('#organizer_description').val(attr.organizer_desc);
    },
  });

  $(document).on('click','#edit_organizer', function(e){
    var model = $event;
    var attr = model.attributes;
    var organizer = $('#organizer_name').val();
    var organizer_desc = $('#organizer_description').val();
    //$('#edit_organizer').attr('disabled', 'disabled');
    model.set({'organizer': organizer, 'organizer_desc' : organizer_desc });
    $.ajax({
      type : "PUT",
      url : "/events/"+attr.id + ".json",
      data:JSON.stringify({
        organizer: organizer,
        organizer_desc : organizer_desc,
      }),
      contentType: 'application/json',
      success : function(response) {
        $('#edit_organizer').removeAttr('disabled');
      },
      error : function(response) {
        $('#edit_organizer').removeAttr('disabled');
      }
    }); 

    $('#event_organizer_form').trigger('reveal:close');
  });


  window.TitleView = Backbone.View.extend({
    initialize: function(){		
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
      this.render();
    },
    render: function(){
      var attr = this.model.attributes;
      var template = _.template( $('#title_template').html(), { title: attr.name} );
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
      $('#title_error').hide();
    },
  });

  $(document).on('click','#event_title_form .save', function(e){
    var model = $event;
    var attr = model.attributes;
    var event_title = $('#event_title').val();
    event_title = event_title;
    if(event_title == ''){
      $('#title_error').html('Title should not be empty');
      $('#title_error').show();
    }
    else{
      $('.save').attr('disabled', 'disabled');
      model.set({'name': event_title });
      $.ajax({
        type : "PUT",
        url : "/events/"+attr.id + ".json",
        data:JSON.stringify({
          name : event_title
        }),
        contentType: 'application/json',
        success : function(response) {
          $('.save').removeAttr('disabled');
        },
        error : function(response) {
          $('.save').removeAttr('disabled');
        }
      }); 

      $('#event_title_form').trigger('reveal:close');
    }
  });


  window.SubtitleView = Backbone.View.extend({
    initialize: function(){		
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
      this.render();
    },
    render: function(){
      var attr = this.model.attributes;
      var template = _.template( $('#subtitle_template').html(), {start_date: timeConverter(attr.start_date), end_date: timeConverter(attr.end_date) , location: attr.location, venue: attr.venue} );
      this.$el.html(template);
    },
    events: {
      "click #edit-subtitle" : "edit_subtitle"
    },
    edit_subtitle: function(e){
      $this = this;
      var model = this.model;
      var attr = this.model.attributes;
      $('#event_subtitle_form').reveal({
        dismissModalClass: 'reveal-close',
      });

      var startdate = timeConverter(attr.start_date);
      var enddate = timeConverter(attr.end_date);

      $('#event_date').val(startdate);
      $('#end_event_date').val(enddate);
      $('#event_location1').attr('value',attr.location);
      $('#event_venue1').attr('value',attr.venue);
    }
  });

  $(document).on('click','#event_subtitle_form .save', function(e){
    var model = $event;
    var attr = model.attributes;
    model.set({'location': $('#event_location1').val()});
    var date = new Date($('#event_date').val());
    var end_date = new Date($('#end_event_date').val());
    model.set({'start_date' : date});
    model.set({'end_date' : end_date});
    var venue = $('#event_venue1').val();
    model.set({'venue': venue});
    $('.save').attr('disabled', 'disabled');
    $.ajax({
      type : "PUT",
      url : "/events/"+attr.id + ".json",
      data:JSON.stringify({
        start_date :timeConverter(date),
        end_date: timeConverter(end_date),
        location : $('#event_location1').val(),
        venue: venue
      }),
      contentType: 'application/json',
      success : function(response) {
        $('.save').removeAttr('disabled');
      },
      error : function(response) {
        $('.save').removeAttr('disabled');
      }
    }); 

  });


  window.DescriptionView = Backbone.View.extend({
    initialize: function(){		
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
      this.render();
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
      var text = attr.description; //.replace(/<br\s*[\/]?>/gi, "\n");
      $('#event_description').attr('value',text);
      $('#description_error').hide();
      
    },
  });


  $(document).on('click','#event_description_form .save', function(e){
    var content = $('#event_description').val();//.replace(/\n\r?/g, '<br />');
    var model = $event;
    var attr = model.attributes;
    model.set({'description': content});
    $.ajax({
      type : "PUT",
      url : "/events/"+attr.id + ".json",
      data:JSON.stringify({
        description: content
      }),
      contentType: 'application/json',
      success : function(response) {
      },
      error : function(response) {
      }
    }); 
  });


  window.SpeakerView = Backbone.View.extend({
    initialize: function(){
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
      this.render();
    },
    render: function(){
      window.event_id = this.model.attributes.id;
      var attr = this.model.attributes;
      var speakers = attr.speakers;
      var template='';
      $.each(speakers,function(index, value){
        template += _.template( $('#speaker_template').html(), value);
      });
      template += _.template( $('#add_speaker_template').html(), {add_speaker: 'New speaker', add_id: attr.id} );
      this.$el.html(template);
      if ($.fn.speaker_photo_upload) {
        $('.upload', this.$el).each(function() { $(this).speaker_photo_upload() });
      }
    },
    events: {
      "click #add_speaker" : "add_speaker",
      "click #remove_speaker" : "remove_speaker",
      "click #edit-speaker" : "edit_speaker",
    },
    add_speaker: function(e){
      $this = this;
      var attr = this.model.attributes;

      $('#event_speaker_form').reveal({
        dismissModalClass: 'reveal-close',
      });

      $('#create_speaker_name_error').hide();
      
    },
    edit_speaker: function(e){
      var model = this.model;
      var remove_string = e.currentTarget.name;
      var id = parseInt(remove_string);
      $('#edit_event_speaker_form').reveal({
        dismissModalClass: 'reveal-close',
      });
      $('#edit_speaker_name_error').hide();
      var speakers = this.model.speakers;
      var edit_speaker = speakers.get(id);
      $('#speaker_id').val(id);
      $('#edit_speaker_name').val(edit_speaker.name);
      $('#edit_speaker_position').val(edit_speaker.position);
      $('#edit_speaker_description').val(edit_speaker.description);
    },
    remove_speaker: function(e){
      var remove_string = e.currentTarget.name;
      var id = parseInt(remove_string);
      var speakers = this.model.speakers;
      speakers.remove(id);
      this.model.set('speakers',speakers.models);
      $.ajax({
        type : "DELETE",
        url : "/speakers/"+id+'.json',
        data:JSON.stringify({
          id:id
        }),
        contentType: 'application/json',
        success : function(response) {
          $('.save').removeAttr('disabled');
        },
        error : function(response) {
          $('.save').removeAttr('disabled');
        }
      }); 
    }
  });

  $(document).on('click','.add#add_speaker', function(e){
      var model = $event;
      var attr = model.attributes;
      if($('#speaker_name').val()!=''){
        var speaker_id;
        var speaker_name = $('#speaker_name').val();
        var speaker_position = $('#speaker_position').val();
        var speaker_description = $('#speaker_description').val();
        $.ajax({
          type : "POST",
          url : "/events/"+attr.id+"/speakers.json",
          data:JSON.stringify({
            name: speaker_name,
            position: speaker_position,
            description: speaker_description
          }),
          contentType: 'application/json',
          success : function(response) {
            speaker_id = response.id;
            $('.add').removeAttr('disabled');
            var speaker = new Speaker(response);
            var speakers1 = $this.model.speakers;
            speakers1.add(speaker);
            $this.model.set('speakers',speakers1.models);
            $('#speaker_name').val('');
            $('#speaker_position').val('');
            $('#speaker_description').val('');
          },
          error : function(response) {
            $('.add').removeAttr('disabled');
          }
        }); 
        $('#event_speaker_form').trigger('reveal:close');
      }else{
        $('#create_speaker_name_error').html('Speaker name can not be empty');
        $('#create_speaker_name_error').show();
      }
    return false;
  });

  $('.save#edit_speaker').click(function(){
    var model = $event;
    var attr = model.attributes;
    id = $('#speaker_id').val();
    var speakers = model.speakers;
    var edit_speaker = speakers.get(id);
    if($('#edit_speaker_name').val()!='')
    {
      var new_speaker = new Speaker({"id":id, "name":$('#edit_speaker_name').val(),"position":$('#edit_speaker_position').val(),"description":$('#edit_speaker_description').val(), "photo_url": edit_speaker.photo_url})
      edit_speaker = new_speaker;
      $.each(speakers.models,function(index, value){
        if(value.id == edit_speaker.id)
          speakers.models[index] = edit_speaker;
      });

      model.set('speakers',speakers.models);
      $.ajax({
        type : "PUT",
        url : "/speakers/"+id+".json",
        data:JSON.stringify({
          name: $('#edit_speaker_name').val(),
          position : $('#edit_speaker_position').val(),
          description : $('#edit_speaker_description').val(),
          photo_url: edit_speaker.photo_url,
        }),
        contentType: 'application/json',
        success : function(response) {

          $('.save').removeAttr('disabled');
          $('#edit_speaker_name').val('');
          $('#edit_speaker_position').val('');
          $('#edit_speaker_description').val('');
        },
        error : function(response) {
          $('.save').removeAttr('disabled');
          $('#edit_speaker_name').val('');
          $('#edit_speaker_position').val('');
          $('#edit_speaker_description').val('');
        }
      }); 
      $('#edit_event_speaker_form').trigger('reveal:close');
    }else{
      $('#edit_speaker_name_error').html('Speaker name can not be empty');
      $('#edit_speaker_name_error').show();
    }
    
  });

  
  window.RegistrationView = Backbone.View.extend({
    initialize: function(){
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
      this.render();
      $('#add_registration_error').hide();
    },
    render: function(){
      var attr = this.model.attributes;
      var registration_types = attr.registration_types;
      var template = '';
      $.each(registration_types, function(index, value){
        var tmp = _.template($('#registration_template').html(), {event_registration_type: value.name,registration_type_id:value.id});
        template += tmp;
      });
      template += _.template($('#add_registration_template').html(), {});
      this.$el.html(template);
      $('#add_registration_error').hide();
    },
    events: {
      "click #add-registration-type" : "add_registration_type",
      "click #remove-registraiton" : "remove_registration",
    },
    add_registration_type:function(e){
      console.log($event);
      var model = $event;
      var attr = model.attributes;
      var event_id = attr.id;
      $('#add_registration_error').hide();
      if($('#registration_type').val()!=''){
        console.log(111);
         $('.add').attr('disabled','disabled');
        $.ajax({
           type : "POST",
           url : "/events/"+event_id+"/registration_types.json",
           data:JSON.stringify({
             name: $('#registration_type').val(),
             event_id : event_id,
           }),
           contentType: 'application/json',
           success : function(response) {
             var registration_type_id = response.id;
             $('.add').removeAttr('disabled');
             var registrations = $this.model.registration_types;
             var registration = new Registration({"id":registration_type_id, "name":$('#registration_type').val(), "event_id":event_id});
             registrations.add(registration);
             model.set("registration_types",registrations.models);
             $('#registration_type').val('');
             $('#add_registration_error').hide();
           },
           error : function(response) {
             $('.add').removeAttr('disabled');
           }
        }); 
      }else{
        $('#add_registration_error').html('Registration type can not be empty');
        $('#add_registration_error').show();
      }
    },
    remove_registration:function(e){
      console.log(e);
      var remove_string = e.currentTarget.name;
      var id = parseInt(remove_string);
      console.log(id);
      var registration_types = this.model.registration_types;
      registration_types.remove(id);
      this.model.set('registration_types',registration_types.models);
      $.ajax({
        type : "DELETE",
        url : "/registration_types/"+id+'.json',
        data:JSON.stringify({
          id:id
        }),
        contentType: 'application/json',
        success : function(response) {
        },
        error : function(response) {
        }
      }); 
      $('#add_registration_error').hide();
    },
  });


  window.ProgramView = Backbone.View.extend({
    initialize: function(){   
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
      this.render();
    },
    render: function(){
      var attr = this.model.attributes;
      var programs = attr.programs;
      var template='';
      var program_model = this.model.programs;
      $this = this;
      $.each(programs,function(index, value){
        var tmp = _.template( $('#program_template').html(), { program_name: value.name, program_id: value.id} );
        var $tmp = $(tmp);
        $activity_container = $tmp.find('#activity_container');
        $tmp.find('table').append($activity_container);
        var activity_view = new ActivityView({ el : $activity_container, model: program_model.models[index]});
        template += $tmp.html();
      });
      template += _.template( $('#add_program_template').html(), {event_id: attr.id} );
      this.$el.html(template);
    },
    events: {
      "click #add-activity" : "add_activity",
      "click #add-program" : "add_program",
      "click #remove-program" : "remove_program",
      "click #remove-activity" : "remove_activity",
      "click #edit-activity" : "edit_activity",
      "click #edit-program" : "edit_program",
    },
    add_program: function(e){
      $this = this;
      var model = this.model;
      var remove_string = e.currentTarget.name;
      var event_id = parseInt(remove_string);
      $('#add_program_form').reveal({
        dismissModalClass: 'reveal-close',
      });
      $('#create_program_error').hide();
      
    },
    edit_program: function(e){
      var model = this.model;
      $('#edit_program_form').reveal({
        dismissModalClass: 'reveal-close',
      });

      $('#edit_program_error').hide();
    },
    remove_program: function(e){
      var remove_string = e.currentTarget.name;
      var id = parseInt(remove_string);
      var programs = this.model.programs;
      programs.remove(id);
      this.model.set('programs',programs.models);
      $.ajax({
        type : "DELETE",
        url : "/programs/"+id+'.json',
        data:JSON.stringify({
          id:id
        }),
        contentType: 'application/json',
        success : function(response) {
        },
        error : function(response) {
        }
      }); 
    },
    add_activity: function(e){
      $this = this;
      var model = this.model;
      $('#event_activity_form').reveal({
        dismissModalClass: 'reveal-close',
      });
      $('#activity_time').timepicker({
        //stepMinutes : 15,
      });
      $('#create_activity_error').hide();
      var remove_string = e.currentTarget.name;
      var prog_id = parseInt(remove_string);
      $('#program_id').val(prog_id);
    },
    edit_activity: function(e){
      $this = this;
      var model = this.model;
      $('#edit_event_activity_form').reveal({
        dismissModalClass: 'reveal-close',
      });
      $('#edit_activity_time').timepicker();

      $('.save#edit_activity').click(function(){
        if(e.handled != true){
          var remove_string = e.currentTarget.name;
          var myarr = remove_string.split("|");
          var activity_id = parseInt(myarr[0]);
          var prog_id = parseInt(myarr[1]);
          var programs = $this.model.programs;
          var activities = programs.get(prog_id);
          
          var activity_time = $('#activity_time').val();
          var activity_description = $('#activity_description').val();
          
      //     var activity_hour = $('#activity_hour').val();
      //     var activity_minute = $('#activity_minute').val();
      //     var activity_description = $('#activity_description').val();
      //     var remove_string = e.currentTarget.name;
      //     var prog_id = parseInt(remove_string);
      //     var date_string = $this.model.start_date.substr(0,10)+" "+activity_hour+':'+activity_minute;
      //     var time = new Date(date_string);

      //     $.ajax({
      //       type : "POST",
      //       url : "/events/"+$this.model.id+"/programs/"+prog_id+"/activities.json",
      //       data:JSON.stringify({
      //         time:time,
      //         topic: activity_description
      //       }),
      //       contentType: 'application/json',
      //       success : function(response) {
      //         var activity_id = response.id;
      //         $('.add').removeAttr('disabled');
      //         var activity = new Activity({"id":activity_id, "time": time, "topic":activity_description,"program_id":prog_id});
      //         var programs = $this.model.programs;
      //         var program = programs.get(prog_id);
      //         var activities = program.activities;
      //         activities.add(activity);
      //         program.set('activities',activities.models);
      //         model.set('programs', programs.models);
      //         $('#activity_hour').val('');
      //         $('#activity_minute').val('');
      //         $('#activity_description').val('');
      //         $this.render();
      //         console.log($this);
      //       },
      //       error : function(response) {
      //         $('.add').removeAttr('disabled');
      //         console.log(2);
      //       }
      //     }); 
           e.handled = true;
           $('#edit_event_activity_form').trigger('reveal:close');
         }
         return false;
      });

    },
    remove_activity:function(e){
      var remove_string = e.currentTarget.name;
      var myarr = remove_string.split("|");
      var activity_id = parseInt(myarr[0]);
      var prog_id = parseInt(myarr[1]);
      var programs = this.model.programs;
      var activities = programs.get(prog_id);
      activities.activities.remove(activity_id);
      activities.set('activities',activities.activities.models);
      this.model.set('programs',programs.models);

      $.ajax({
        type : "DELETE",
        url : "/activities/"+activity_id+'.json',
        contentType: 'application/json',
        success : function(response) {
          $this.render();
        },
        error : function(response) {
        }
      }); 
    }

  });
  $(document).on('click','.add#create_program', function(e){
    var model = $event;
    var attr = model.attributes;
    var event_id = attr.id;
    if($('#program_title').val()!=''){
      $('.add').attr('disabled','disabled');
      $.ajax({
        type : "POST",
        url : "/events/"+event_id+"/programs.json",
        data:JSON.stringify({
          name: $('#program_title').val(),
        }),
        contentType: 'application/json',
        success : function(response) {
          var program_id = response.id;
          $('.add').removeAttr('disabled');
          var programs = $this.model.programs;
          var activities = new Activities();
          var program = new Program({"id":program_id, "name":$('#program_title').val(), "event_id":event_id, "activities":activities});
          program.activities.models.pop();
          programs.add(program);
          model.set("programs",programs.models);
          $('#program_title').val('');
        },
        error : function(response) {
          $('.add').removeAttr('disabled');
        }
      }); 
      $('#add_program_form').trigger('reveal:close');
    }else{
      $('#create_program_error').html('Program name can not be empty');
      $('#create_program_error').show();
    }
  });

  $(document).on('click','.save#edit_program', function(e){
    var model = $event;
    var attr = model.attributes;
    var event_id = attr.id;
    if($('#program_title').val()!=''){
      $('.add').attr('disabled','disabled');
      $.ajax({
        type : "POST",
        url : "/events/"+event_id+"/programs.json",
        data:JSON.stringify({
          name: $('#program_title').val(),
        }),
        contentType: 'application/json',
        success : function(response) {
          var program_id = response.id;
          $('.add').removeAttr('disabled');
          var programs = $this.model.programs;
          var activities = new Activities();
          var program = new Program({"id":program_id, "name":$('#program_title').val(), "event_id":event_id, "activities":activities});
          program.activities.models.pop();
          programs.add(program);
          model.set("programs",programs.models);
          $('#program_title').val('');
        },
        error : function(response) {
          $('.add').removeAttr('disabled');
        }
      }); 
      $('#add_program_form').trigger('reveal:close');
    }else{
      $('#create_program_error').html('Program name can not be empty');
      $('#create_program_error').show();
    }
  });

  $(document).on('click','.add#create_activity', function(e){
    var prog_id = $('#program_id').val();
    var model = $event;
    if($('#activity_description').val()==0){
      $('#create_activity_error').html('Activity topic can not be empty');
      $('#create_activity_error').show();
    }else{
      $('.add').attr('disabled','disabled');
      var activity_time = $('#activity_time').val();
      var activity_description = $('#activity_description').val();           
      activity_time = new Date("08 Jan 2012 "+activity_time);

      $.ajax({
        type : "POST",
        url : "/events/"+model.id+"/programs/"+prog_id+"/activities.json",
        data:JSON.stringify({
          time : timeConverter(activity_time),
          topic: activity_description
        }),
        contentType: 'application/json',
        success : function(response) {
          var activity_id = response.id;
          $('.add').removeAttr('disabled');
          var activity = new Activity({"id":activity_id, "time": activity_time, "topic":activity_description,"program_id":prog_id});
          var programs = $this.model.programs;
          var program = programs.get(prog_id);
          var activities = program.activities;
          activities.add(activity);
          program.set('activities',activities.models);
          model.set('programs', programs.models);
          $('#activity_time').val('');
          $('#activity_description').val('');
          $this.render();
        },
        error : function(response) {
          $('.add').removeAttr('disabled');
        }
      }); 
      $('#event_activity_form').trigger('reveal:close');
    }
    return false;
  });

  window.ActivityView = Backbone.View.extend({
    initialize: function(){   
      _.bindAll(this, "render");
      this.render();
      this.model.bind('change', this.render);
    },
    render: function(){
      var activities = this.model.attributes.activities;
      var prog_id = this.model.id;
      var template='';
      $.each(activities,function(index, value){
        template += _.template( $('#activity_template').html(), { activity_id:value.id+'|'+prog_id,
                               activity_topic: value.topic, activity_time: timeConverter_prog(value.time) } );
      });
      template += _.template( $('#add_activity_template').html(), { prog_id:prog_id} );
      this.$el.html(template);
    },

  });

  basic_edit = function($event){
    $('#basic_event_edit').click(function(e){
      $('#basic_editing').reveal({
        dismissModalClass: 'reveal-close',
        closeOnBackgroundClick : false, 
      });
      var startdate = timeConverter($event.start_date);
      var enddate = timeConverter($event.end_date);

      $('#basic_event_name').val($event.name);
      $('#basic_event_start_time').val(startdate);
      $('#basic_event_end_time').val(enddate);
      $('#basic_event_description').val($event.description);
      $('#basic_event_location').val($event.location);
      $('#basic_event_venue').val($event.venue);
      $('#basic_event_organizer').val($event.organizer);
      $('#basic_event_organizer_desc').val($event.organizer_desc);

      $('#basic_event_name_error').hide();
      $('#basic_event_start_time_error').hide();
      $('#basic_event_end_time_error').hide();
      $('#basic_event_description_error').hide();
      $('#basic_event_location_error').hide();
      $('#basic_event_venue_error').hide();
      $('#basic_event_organizer_error').hide();
      $('#basic_event_organizer_desc_error').hide();
    });
  };

  $(document).on('click','#basic_event_edit_save', function(){
    var name = $('#basic_event_name').val();
    var start_time = $('#basic_event_start_time').val();
    var end_time = $('#basic_event_end_time').val();
    var description = $('#basic_event_description').val();
    var location = $('#basic_event_location').val();
    var venue = $('#basic_event_venue').val();
    var organizer = $('#basic_event_organizer').val();
    var organizer_desc = $('#basic_event_organizer_desc').val();
    
    var failed = false;
    if(name==''){
      $('#basic_event_name_error').html("Event name can not be empty");
      $('#basic_event_name_error').show();
      failed = true;
    }
    if(location==''){
      $('#basic_event_location_error').html("Event location can not be empty");
      $('#basic_event_location_error').show();
      failed = true;
    }
    if(start_time==''){
      $('#basic_event_start_time_error').html("Event start time can not be empty");
      $('#basic_event_start_time_error').show();
      failed = true;
    }
    if(end_time==''){
      $('#basic_event_end_time_error').html("Event end time can not be empty");
      $('#basic_event_end_time_error').show();
      failed = true;
    }
    if (failed) return;
    $event.set({'name':name});
    $event.set({'start_time':start_time});
    $event.set({'end_time':end_time});
    $event.set({'description':description});
    $event.set({'location':location});
    $event.set({'venue':venue});
    $event.set({'organizer':organizer});
    $event.set({'organizer_desc':organizer_desc});
    $.ajax({
      type : "PUT",
      url : "/events/"+$event.id+".json",
      data:JSON.stringify({
        name : name,
        start_time : start_time,
        end_time : end_time,
        description : description,
        location : location,
        venue: venue,
        organizer : organizer,
        organizer_desc : organizer_desc,
      }),
      contentType: 'application/json',
      success : function(response) {
      },
      error : function(response) {
      }
    });
    $('#basic_editing').trigger('reveal:close');
  });

  init = function(){
    if (typeof event_json === 'undefined') return;
    event = new Event(JSON.parse(event_json));
    $event = event;
    //event.fetch();
    var title_view = new TitleView({el : $('#title_container'), model: event });
    var subtitle_view = new SubtitleView({el : $('#subtitle_container'), model: event });
    var description_view = new DescriptionView({el : $('#description_container'), model: event });
    var speaker_view = new SpeakerView({el : $('#speaker_container'), model: event });
    var program_view = new ProgramView({el : $('#program_container'), model: event });
    var organizer_view = new OrganizerView({el : $('#organizer_container'), model: event });
    var registration_view = new RegistrationView({el: $('#registration_container'), model:event});
    basic_edit($event);
    $('#edit-registration').click(function(){
      $('#event_registration_form').reveal({
        dismissModalClass: 'reveal-close',
      });
    });
  };
  init();

})(jQuery);
