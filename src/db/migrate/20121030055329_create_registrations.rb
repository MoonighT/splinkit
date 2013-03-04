class CreateRegistrations < ActiveRecord::Migration
  def change
    create_table :registrations do |t|
      t.integer :event_id
      t.string :first_name
      t.string :last_name
      t.string :email

      t.timestamps
    end
  end
end
