class EventTab < ActiveRecord::Base
  attr_accessible :content, :event_id, :title
  belongs_to :event
end
