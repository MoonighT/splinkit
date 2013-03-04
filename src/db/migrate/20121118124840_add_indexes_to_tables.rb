class AddIndexesToTables < ActiveRecord::Migration
  def change
    add_index :events, :user_id
    add_index :photos, :event_id
    add_index :speakers, :event_id
    add_index :event_tabs, :event_id
    add_index :registration_types, :event_id
    add_index :registrations, :event_id
    add_index :registrations, :registration_type_id
    add_index :programs, :event_id
    add_index :activities, :program_id
    add_index :fb_attendee_data, :fb_id, unique: true
    add_index :fb_attendee_likes, :fb_id
  end
end
