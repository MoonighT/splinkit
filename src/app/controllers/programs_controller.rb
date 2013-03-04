class ProgramsController < ApplicationController
  # GET /events/1/programs.json
  def index
    @event = Event.find(params[:event_id])
    @programs = @event.programs

    respond_to do |format|
      format.json { render json: @programs }
    end
  end

  # GET /programs/1.json
  def show
    @program = Program.find(params[:id])

    respond_to do |format|
      format.json {
        render json: @program.as_json(params)
      }
    end
  end

  # GET /events/1/programs/new
  # GET /events/1/programs/new.json
  def new
    @event = Event.find(params[:event_id])
    @program = @event.programs.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @program }
    end
  end

  # POST /events/1/programs
  # POST /events/1/programs.json
  def create
    @event = Event.find(params[:event_id])
    @program = @event.programs.build(params[:program])

    respond_to do |format|
      if @program.save
        format.html {
          redirect_to @event,
          notice: 'Program was successfully created.'
        }
        format.json {
          render json: @program,
          status: :created,
          location: @program
        }
      else
        format.html { render action: "new" }
        format.json {
          render json: @program.errors, status: :unprocessable_entity
        }
      end
    end
  end

  # PUT /programs/1.json
  def update
    @program = Program.find(params[:id])

    respond_to do |format|
      if @program.update_attributes(params[:program])
        format.json { head :no_content }
      else
        format.json {
          render json: @program.errors, status: :unprocessable_entity
        }
      end
    end
  end

  # DELETE /programs/1.json
  def destroy
    @program = Program.find(params[:id])
    @program.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
