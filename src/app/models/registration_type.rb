class RegistrationType < ActiveRecord::Base
  attr_accessible :event_id, :name

  belongs_to :event
  has_many :registrations

  def as_json(options)
    super(RegistrationType.json_options(options))
  end

  def self.json_options(options = {})
    json_options = {
      only: [:id, :name]
    }
  end
end
