class ActivitiesController < ApplicationController

  # GET /events/1/programs/1/activities.json
  def index
    @program = Program.find(params[:program_id])
    @activities = @program.activities

    respond_to do |format|
      format.json { render json: @activities }
    end
  end

  # GET /activities/1.json
  def show
    @activity = Activity.find(params[:id])

    respond_to do |format|
      format.json { render json: @activity }
    end
  end

  # GET /events/1/programs/1/activities/new
  # GET /events/1/programs/1/activities/new.json
  def new
    @event = Event.find(params[:event_id])
    @program = Program.find(params[:program_id])
    @activity = @program.activities.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @activity }
    end
  end

  # POST /events/1/programs/1/activities
  # POST /events/1/programs/1/activities.json
  def create
    @event = Event.find(params[:event_id])
    @program = Program.find(params[:program_id])
    @activity = @program.activities.build(params[:activity])

    respond_to do |format|
      if @activity.save
        format.html {
          redirect_to @event, notice: 'Activity was successfully created.'
        }
        format.json {
          render json: @activity,
          status: :created,
          location: @activity
        }
      else
        format.html { render action: "new" }
        format.json {
          render json: @activity.errors, status: :unprocessable_entity
        }
      end
    end
  end

  # PUT /activities/1.json
  def update
    @activity = Activity.find(params[:id])

    respond_to do |format|
      if @activity.update_attributes(params[:activity])
        format.json { head :no_content }
      else
        format.json {
          render json: @activity.errors, status: :unprocessable_entity
        }
      end
    end
  end

  # DELETE /activities/1.json
  def destroy
    @activity = Activity.find(params[:id])
    @activity.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
