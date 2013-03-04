class AddIndexToRegistrations < ActiveRecord::Migration
  def change
    add_index :registrations, [:event_id, :email], unique: true
  end
end
