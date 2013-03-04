class PhotosController < ApplicationController

  # GET /events/1/photos.json
  def index
    @event = Event.find(params[:event_id])
    @photos = @event.photos

    respond_to do |format|
      format.json { render json: @photos }
    end
  end

  # GET /photos/1.json
  def show
    @photo = Photo.find(params[:id])

    respond_to do |format|
      format.json { render json: @photo }
    end
  end

  # GET /events/1/photos/new.json
  def new
    @event = Event.find(params[:event_id])
    @photo = Photo.new

    respond_to do |format|
      format.json { render json: @photo }
    end
  end

  # POST /events/1/photos.json
  def create
    file = get_upload_file(params, request)
    @event = Event.find(params[:event_id])
    @photo = @event.photos.build(content: file)

    respond_to do |format|
      if @photo.save
        format.json {
          render json: @photo, status: :created, location: @photo
        }
      else
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /photos/1.json
  def update
    @photo = Photo.find(params[:id])

    respond_to do |format|
      if @photo.update_attributes(params[:photo])
        format.json { head :no_content }
      else
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photos/1.json
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
