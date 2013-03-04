class Activity < ActiveRecord::Base
  attr_accessible :time, :topic
  belongs_to :program

  validates :topic, presence: true

  def as_json(options)
    super(Activity.json_options(options))
  end

  def self.json_options(options)
    { only: [:id, :program_id, :time, :topic] }
  end
end
