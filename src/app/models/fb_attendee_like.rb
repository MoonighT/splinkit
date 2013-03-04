class FbAttendeeLike < ActiveRecord::Base
  attr_accessible :fb_id, :page_id
  belongs_to :registration, foreign_key: "fb_id", primary_key: "fb_id"
end
