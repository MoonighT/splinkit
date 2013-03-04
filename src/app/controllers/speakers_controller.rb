class SpeakersController < ApplicationController
  # GET /events/1/speakers.json
  def index
    @event = Event.find(params[:event_id])
    @speakers = @event.speakers

    respond_to do |format|
      format.json { render json: @speakers }
    end
  end

  # GET /speakers/1.json
  def show
    @speaker = Speaker.find(params[:id])

    respond_to do |format|
      format.json { render json: @speaker }
    end
  end

  # GET /events/1/speakers/new
  # GET /events/1/speakers/new.json
  def new
    @event = Event.find(params[:event_id])
    @speaker = @event.speakers.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @speaker }
    end
  end

  # POST /events/1/speakers
  # POST /events/1/speakers.json
  def create
    @event = Event.find(params[:event_id])
    @speaker = @event.speakers.build(params[:speaker])

    respond_to do |format|
      if @speaker.save
        format.html { redirect_to @event, notice: 'Speaker was successfully created.' }
        format.json { render json: @speaker, status: :created, location: @speaker }
      else
        format.html { render action: "new" }
        format.json { render json: @speaker.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /speakers/1.json
  def update
    @speaker = Speaker.find(params[:id])

    respond_to do |format|
      if @speaker.update_attributes(params[:speaker])
        format.json { head :no_content }
      else
        format.json { render json: @speaker.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /speakers/1/photo.json
  def photo
    @speaker = Speaker.find(params[:id])
    file = get_upload_file(params, request)
    respond_to do |format|
      if @speaker.update_attributes({ photo: file })
        format.json { render json: { photo_url: @speaker.photo_url } }
      else
        format.json { render json: @speaker.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /speakers/1.json
  def destroy
    @speaker = Speaker.find(params[:id])
    @speaker.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
