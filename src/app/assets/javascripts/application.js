// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require json2
//= require underscore
//= require backbone
//= require 'jquery-ui-1.9.1'
//= require 'jquery-ui-timepicker-addon'
//= require_tree .

(function($) {
  $(function() {
    $('input, textarea').placeholder();

    $('.js-date-picker').attr("placeholder", "dd/mm/yyyy").datepicker({dateFormat: 'dd-M-yy'});
    var endDateTextBox = $('.end-datetime-picker');
    var startDateTextBox = $('.start-datetime-picker');
    $('.start-datetime-picker').datetimepicker({ 
      
      dateFormat : 'dd M yy',
      stepMinute: 15,
      onClose: function(dateText, inst) {
        if (endDateTextBox.val() != '') {
          var testStartDate = startDateTextBox.datetimepicker('getDate');
          var testEndDate = endDateTextBox.datetimepicker('getDate');
          if (testStartDate > testEndDate)
            endDateTextBox.datetimepicker('setDate', testStartDate);
        }
        else {
          endDateTextBox.val(dateText);
        }
      },
      onSelect: function (selectedDateTime){
        endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate') );
      }
    });
    $('.end-datetime-picker').datetimepicker({ 
      
      dateFormat : 'dd M yy',
      stepMinute: 15,
      onClose: function(dateText, inst) {
        if (startDateTextBox.val() != '') {
          var testStartDate = startDateTextBox.datetimepicker('getDate');
          var testEndDate = endDateTextBox.datetimepicker('getDate');
          if (testStartDate > testEndDate)
            startDateTextBox.datetimepicker('setDate', testEndDate);
        }
        else {
          startDateTextBox.val(dateText);
        }
      },
      onSelect: function (selectedDateTime){
        startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate') );
      }
    });
  });
})(jQuery);
