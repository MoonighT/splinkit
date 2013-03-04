class ApplicationController < ActionController::Base
  include FileUpload

  protect_from_forgery

  layout :set_layout

private
  def set_layout
    if request.headers["X-PJAX"]
      false
    else
      "application"
    end
  end

  def after_sign_out_path_for(resource_or_scope)
      request.referrer
  end

  def after_sign_in_path_for(resource)
    omniauth_params = session[:omniauth_params]
    redirect_action = omniauth_params ? omniauth_params["redirect_action"] : nil
    if redirect_action == "event#create"
      return new_event_path(continue: "sign_in")
    end
    super
  end
end
