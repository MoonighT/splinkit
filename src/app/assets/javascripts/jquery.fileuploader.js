//= require jquery
//= require fileuploader
//
// $('*').fileuploader({
//  action: '',
//  ext: ['jpeg', 'jpg', 'gif', 'png'],
//  size: 102400,
//  debug: false,
//  submit: function(id, filename) {},
//  upload: function(id, filename) {},
//  progress: function(id, filename, loaded, total) {},
//  complete: function(id, filename, response) {}
// });
//
(function($) {
  $.fn.fileuploader = function(options) {
    options = options || {};
    var $this = $(this);
    var action = options.action || $this.data('action');
    var uploader = new qq.FileUploaderBasic({
      button: $this[0],
      action: action,
      debug: options.debug,
      allowedExtensions: options.ext || ['jpeg', 'jpg', 'gif', 'png'],
      sizeLimit: options.size || 102400,
      onSubmit: options.submit,
      onUpload: options.upload,
      onProgress: options.progress,
      onComplete: options.complete
    });
  };
})(jQuery);
