require 'csv'

class Registration < ActiveRecord::Base
  attr_accessible :email, :event_id, :first_name, :last_name, :fb_id,
    :registration_type_id

  belongs_to :event
  belongs_to :registration_type
  has_one :fb_attendee_data, foreign_key: "fb_id", primary_key: "fb_id", dependent: :destroy
  has_many :fb_attendee_likes, foreign_key: "fb_id", primary_key: "fb_id", dependent: :destroy

  validates :first_name, :last_name, :email, presence: true
  validates_format_of :email, with: /\A[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+\Z/i

  def registration_type_name
    registration_type.nil? ? "" : registration_type.name
  end

  def self.to_csv2(options = {})
    include_type = any? && first.event.registration_types.any?

    header = ["First name", "Last name", "Email"]
    header.push("Ticket Type") if include_type
    columns = ['first_name', 'last_name', 'email']
    CSV.generate(options) do |csv|
      csv << header
      all.each do |registration|
        values = registration.attributes.values_at(*columns)
        values.push(registration.registration_type_name) if include_type
        csv << values
      end
    end
  end

  def as_json(options)
    super(Registration.json_options(options))
  end

  def self.json_options(options = {})
    json_options = {
      only: [:id, :email, :first_name, :last_name, :fb_id],
      include: { registration_type: RegistrationType.json_options }
    }
  end
end
