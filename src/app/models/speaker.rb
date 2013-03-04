class Speaker < ActiveRecord::Base
  attr_accessible :description, :name, :position, :photo
  belongs_to :event
  has_attached_file :photo, :styles => { :standard => "110x100>" },
    default_url: "/assets/speaker.png"

  validates :name, presence: true
  validates_attachment :photo, content_type:
      { content_type: ContentTypes.image_content_type }

  def photo_url
    photo.url(:standard)
  end

  def as_json(options)
    super(Speaker.json_options)
  end

  def self.json_options(options = {})
    {
      only: [:id, :event_id, :name, :position, :description],
      methods: [:photo_url]
    }
  end
end
