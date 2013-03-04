class FbAttendeeData < ActiveRecord::Base
  attr_accessible :age, :fb_id, :gender
  belongs_to :registration, foreign_key: "fb_id", primary_key: "fb_id"

private
  def self.count_in_event(event_id)
    return FbAttendeeData.joins(:registration) .select("registrations.id, fb_attendee_data.*")
      .where("registrations.event_id" => event_id)
  end

  def self.count_gender(event_id, gender)
    return FbAttendeeData.count_in_event(event_id).where(gender: gender).count()
  end

  def self.count_age_group(event_id, age_range)
    return FbAttendeeData.count_in_event(event_id).where(age: age_range).count()
  end
end
