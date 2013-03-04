class EventsController < ApplicationController
  before_filter :create_event_authenticate_user, only: [:create]
  load_and_authorize_resource

  # GET /events
  # GET /events.json
  def index
    @events = Event.joins(:registrations).group("events.id HAVING count(registrations.id) >= 5")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @events }
    end
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @event.as_json(params) }
    end
  end

  # GET /events/new
  # GET /events/new.json
  def new
    # continue create event from sign in
    if params[:continue] == "sign_in" and session[:create_event]
      @event = current_user.events.build(session[:create_event])
      session[:create_event] = nil
      if @event.save
        redirect_to @event, notice: 'Event was successfully created.'
      else
        render action: "new"
      end
      return
    end

    @event = Event.new
    @event[:name] = flash[:name]

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @event }
    end
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
    if user_signed_in?
      @event = current_user.events.build(params[:event])
    end

    respond_to do |format|
      if @event.save
        format.html { redirect_to edit_event_path(@event) }
        format.json { render json: @event, status: :created, location: @event }
      else
        format.html { render action: "new" }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /events/1
  # PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.html { redirect_to edit_event_path(@event), notice: 'Event was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /events/1/banner.json
  def banner
    file = get_upload_file(params, request)
    respond_to do |format|
      if @event.update_attributes({ banner: file })
        format.json { render json: { banner_url: @event.banner_url } }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /events/1/poster.json
  def poster
    file = get_upload_file(params, request)
    respond_to do |format|
      if @event.update_attributes({ poster: file })
        format.json { render json: { poster_url: @event.poster_url } }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  #DELETE /events/1/poster.json
  def delete_poster
    respond_to do |format|
      if @event.update_attributes({ poster: nil })
        format.json { render json: { poster_url: @event.poster_url } }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end


  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url }
      format.json { head :no_content }
    end
  end

private
  def create_event_authenticate_user
    if user_signed_in?
      return
    end
    # if event has errors, don't force user to sign in
    @event = Event.new(params[:event])
    if !@event.valid?
      return
    end

    if !user_signed_in?
      flash[:redirect_action] = "event#create"
      session[:create_event] = params[:event]
      authenticate_user!
    end
  end

end
