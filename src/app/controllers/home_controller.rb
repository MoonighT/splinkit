class HomeController < ApplicationController
  before_filter :authenticate_user!, only: [:my_events]

  def index
  end

  def create_event
    event = params[:event]
    flash[:name] = event.nil? ? nil : event[:name]
    redirect_to new_event_path
  end

  def my_events
    @events = current_user.events
  end
end
