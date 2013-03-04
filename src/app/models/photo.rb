class Photo < ActiveRecord::Base
  attr_accessible :content
  belongs_to :event
  has_attached_file :content, :styles => { :standard => "100x100>" }

  validates_attachment :content,
    content_type: { content_type: ContentTypes.image_content_type }

  def content_url
    content.url(:standard)
  end

  def as_json(options)
    super(Photo.json_options)
  end

  def self.json_options(options = {})
    { only: [:id, :event_id], methods: [:content_url] }
  end
end
