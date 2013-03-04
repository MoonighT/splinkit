class RegistrationsController < ApplicationController

  # GET /registrations
  # GET /registrations.json
  def index
    @event = Event.find(params[:event_id])
    authorize! :view_registrations, @event

    @registrations = @event.registrations.order(:created_at)
    @top_likes = FbAttendeeLike.joins(:registration)
      .select("registrations.id, fb_attendee_likes.*, count(*) count")
      .where("registrations.event_id" => @event.id).group(:page_id).order("count DESC").limit(10)

    @genders = {
      male: FbAttendeeData.count_gender(@event.id, 1),
      female: FbAttendeeData.count_gender(@event.id, 2)
    }

    @age_group_defs = { "11-20" => 11..20, "21-30" => 21..30, "31-40" => 31..40 }
    @age_groups = {}
    @age_group_defs.each do |group_name, age_range|
      @age_groups[group_name] = FbAttendeeData.count_age_group(@event.id, age_range)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @registrations }
      format.csv { send_data @registrations.to_csv2 }
    end
  end

  # POST /registrations.json
  def create
    @event = Event.find(params[:event_id])
    if params[:facebook].nil?
      reg_params = params[:registration]
    else
      reg_params = registration_from_fb
      reg_params[:registration_type_id] = params[:type]
    end
    @registration = @event.registrations.build(reg_params)

    respond_to do |format|
      if @event.registrations.find_by_email(@registration.email)
        format.json {
          render(json: { error: "The given email has already registered" },
                 status: :unprocessable_entity)
        }
      elsif @registration.save
        Notifier.event_registered(@registration, @event).deliver
        json = @registration.as_json({})
        json[:other_people] = @event.registrations.count - 1 if params[:facebook]
        format.json { render json: json, status: :created }
      else
        format.json { render json: @registration.errors, status: :unprocessable_entity }
      end
    end
  end

private
  def registration_from_fb
    fb_auth = FbGraph::Auth.new("117856901703068", "ba6b132191fe51a483c8056c74d1309f")
    # get Facebook's auth cookie in advance using their JS SDK
    fb_auth.from_cookie(cookies)
    user = fb_auth.user.fetch

    FbAttendeeData.destroy_all(fb_id: user.identifier)
    age = ((Date.today - user.birthday) / 365).floor
    gender = user.gender == "male" ? 1 : 2
    FbAttendeeData.create!({fb_id: user.identifier, age: age, gender: gender})

    FbAttendeeLike.destroy_all(fb_id: user.identifier)
    likes = user.likes
    while likes.any? do
      likes.each do |page|
        FbAttendeeLike.create!({fb_id: user.identifier, page_id: page.identifier})
      end
      likes = likes.next
    end

    {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      fb_id: user.identifier
    }
  end
end
