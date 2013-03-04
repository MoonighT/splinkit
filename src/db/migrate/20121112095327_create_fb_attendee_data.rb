class CreateFbAttendeeData < ActiveRecord::Migration
  def change
    create_table :fb_attendee_data do |t|
      t.string :fb_id
      t.integer :gender, limit: 1
      t.integer :age, limit: 2

      t.timestamps
    end
  end
end
