//= require jquery.fileuploader
(function($) {
  // $('#photo-uploader').fileuploader({
  //   complete: function(id, filename, response) {
  //     $('#photos').append('<li><img src="' + response.content_url + '"></li');
  //   }
  // });
  $.fn.speaker_photo_upload = function() {
      var $this = $(this);
      $this.fileuploader({
        size: 1 * 1024 * 1024,
        complete: function(id, filename, response) {
          $('img', $this.parents('.speaker').first()).prop('src', response.photo_url);
        }
      });
  }
  $(function() {
    $('#edit-banner').fileuploader({
      size: 5 * 1024 * 1024,
      complete: function(id, filename, response) {
        if (response.banner_url)
          $('#banner-image').css('background-image', "url('" + response.banner_url + "')");
      }
    });
    $('#edit-poster').fileuploader({
      size: 5 * 1024 * 1024,
      complete: function(id, filename, response) {
        if (response.poster_url)
          $('#poster-image').prop('src', response.poster_url);
      }
    });
    $('#delete-poster').click(function() {
      $.ajax($(this).data('action'), {
        type: 'DELETE',
        success: function(response) {
          $('#poster-image').prop('src', response.poster_url);
        }
      });
    });
    $('dl.speaker .upload').each(function() {
      $(this).speaker_photo_upload();
    });
  });
})(jQuery);
