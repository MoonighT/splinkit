(function($) {
  $(function() {
    var $registerModal = $('#register-modal');
    if (!$registerModal.length) return;

    var $registerFbModal = $('#register-fb-modal');
    var $registerFbButton = $('#register-with-fb');
    var $alertFb = $('.alert', $registerFbModal);
    var $fbTicketType = $('[name="register-ticket-type"]', $registerFbModal);
    var $progressBar = $('.progress', $registerFbModal);
    var $progressBarInner = $('span', $progressBar);

    var $successModal = $('#register-success-modal');
    var $form = $('form', $registerModal);
    var $registerButton = $('input[type=submit]', $registerModal);
    var $closeButton = $('.close-reveal-modal', $registerModal);
    var $inputs = $('input[type!=submit][type!=hidden]', $form);
    var url = $form.attr('action') + ".json";
    var $alert = $('.alert', $registerModal);

    function disable($btn) {
      $btn.prop('disabled', true);
    }
    
    function enable($btn) {
      $btn.removeProp('disabled');
    }

    function startRegister() {
      disable($registerButton);
      disable($registerFbButton);
      $closeButton.hide();
    }

    function endRegister() {
      enable($registerButton);
      enable($registerFbButton);
      $closeButton.show();
      $progressBar.hide();
    }

    function showAlert($alert, message) {
      $alert.show().html(message);
    }
    
    function hideAlert() {
      $alert.hide();
      $alertFb.hide();
    }

    function register(data, $alert, success) {
      startRegister();

      $.ajax(url, {
        type: "POST",
        data: data,
        success: function(response) {
          $inputs.val('');
          endRegister();
          if (success) {
            success(response);
          }
          $successModal.reveal();
        },
        error: function(jqXHR) {
          endRegister();
          try {
            response = JSON.parse(jqXHR.responseText);
            if (response.error) {
              showAlert($alert, response.error);
              return;
            }
          } catch (error) {
          }
          showAlert($alert, 'Failed to register. Please try again.');
        }
      });
    }

    $registerButton.click(function(e) {
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
      var error = false;
      var errorMessage = 'Please fill in all required fields';
      $inputs.each(function(index, el) {
        var $input = $(el);
        if (!error && $input.is('[type=email]') && !emailRegex.test($input.val())) {
          $input.addClass('error')
          error = true;
          errorMessage = 'The email address is invalid';
          return;
        }
        if ($input.val().trim() === '') {
          $input.addClass('error');
          error = true;
        } else {
          $input.removeClass('error');
        }
      });

      hideAlert();
      if (error) {
        showAlert($alert, errorMessage);
        return false;
      }
      register($form.serialize(), $alert);
      return false;
    });


    function updateProgressBar() {
      if (!$progressBar.is(":visible"))
        return;
      var width = $progressBar.data("width");
      if (width < 100) {
        $progressBarInner.width((width + 20) + "%");
        $progressBar.data("width", width + 20);
      }
      if (width < 80) {
        setTimeout(updateProgressBar, 1000);
      }
    }

    function registerWithFacebook() {
      $progressBar.show();
      $progressBarInner.width("0");
      $progressBar.data("width", 0);
      setTimeout(updateProgressBar, 1000);

      var share = $('input.share', $registerFbModal).is(':checked');
      register({ facebook: 1, type: $fbTicketType.val()}, $alertFb, function(reg) {
        if (!share) return;
        FB.api('me', function(res) {
          if (!res.name) return;

          var otherPeopleText = (reg.other_people ? ' with ' + reg.other_people + ' other people' : '');
          FB.api('me/feed', 'POST', {
            link: document.location.href,
            picture: $('#banner-image img').prop('src'),
            message: res.name + ' is going to ' +  $('#title_container h1').html() +
              otherPeopleText + '. Find out more about this event on Splinkit.'
          }, function(r) {
          });
        });
      });
    }

    $('#register-now').click(function() {
      hideAlert();
      $progressBar.hide();
      $inputs.removeClass('error');
      $registerFbModal.reveal();
    });

    $registerFbButton.click(function() {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          registerWithFacebook();
        } else {
          FB.login(function(response) {
            if (response.authResponse) {
              registerWithFacebook();
            }
          }, {scope: 'email, user_likes, user_birthday, publish_stream'});
        }
      });
    });
  });
})(jQuery);
