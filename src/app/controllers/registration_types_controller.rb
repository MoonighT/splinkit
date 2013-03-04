class RegistrationTypesController < ApplicationController
  # GET /event/1/registration_types.json
  def index
    @registration_types = RegistrationType.all

    respond_to do |format|
      format.json { render json: @registration_types }
    end
  end

  # POST /event/1/registration_types.json
  def create
    @registration_type = RegistrationType.new(params[:registration_type])

    respond_to do |format|
      if @registration_type.save
        format.json { render json: @registration_type, status: :created }
      else
        format.json { render json: @registration_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /registration_types/1.json
  def update
    @registration_type = RegistrationType.find(params[:id])

    respond_to do |format|
      if @registration_type.update_attributes(params[:registration_type])
        format.json { head :no_content }
      else
        format.json { render json: @registration_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /registration_types/1.json
  def destroy
    @registration_type = RegistrationType.find(params[:id])
    @registration_type.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
