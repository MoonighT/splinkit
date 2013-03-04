class Program < ActiveRecord::Base
  attr_accessible :name
  has_many :activities, dependent: :destroy
  belongs_to :event

  validates :name, presence: true

  def as_json(options)
    super(Program.json_options(options))
  end

  def self.json_options(options = {})
    json_options = { only: [:id, :event_id, :name] }
    if options[:details] == "all"
      json_options[:include] = { activities: Activity.json_options(options) }
    end
    json_options
  end
end
