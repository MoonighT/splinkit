class Event < ActiveRecord::Base
  attr_accessible :description, :end_date, :location, :name, :start_date,
    :banner, :poster, :organizer, :organizer_desc, :venue
  has_attached_file :banner, styles: { standard: "960x320>" },
    default_url: "/assets/cover.jpg"
  has_attached_file :poster, styles: { standard: "610x610>" },
    default_url: "http://placehold.it/610x320&text=upload+your+event+poster+here"

  has_many :speakers, dependent: :destroy
  has_many :programs, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :registrations, dependent: :destroy
  has_many :event_tabs, dependent: :destroy
  has_many :registration_types, dependent: :destroy

  belongs_to :user

  validates_attachment :banner,
    content_type: { content_type: ContentTypes.image_content_type },
    size: { in: 0..5.megabytes }
  validates_attachment :poster,
    content_type: { content_type: ContentTypes.image_content_type },
    size: { in: 0..5.megabytes }
  validates :name, :start_date, :end_date, presence: true

  def banner_url
    banner.url(:standard)
  end

  def poster_url
    poster.url(:standard)
  end

  def as_json(options)
    super(Event.json_options(options))
  end

  def self.json_options(options = {})
    json_options = {
      methods: [:banner_url, :poster_url],
      only: [:id, :name, :description, :location, :start_date, :end_date,
        :organizer, :organizer_desc, :venue]
    }
    if options[:details] == "all"
      json_options[:include] = {
        programs: Program.json_options(options),
        speakers: Speaker.json_options(options),
        photos: Photo.json_options(options),
        registration_types: RegistrationType.json_options(options)
      }
    end
    json_options
  end
end
