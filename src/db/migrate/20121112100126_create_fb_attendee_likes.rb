class CreateFbAttendeeLikes < ActiveRecord::Migration
  def change
    create_table :fb_attendee_likes do |t|
      t.string :fb_id
      t.string :page_id

      t.timestamps
    end
  end
end
