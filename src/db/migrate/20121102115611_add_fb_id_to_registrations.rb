class AddFbIdToRegistrations < ActiveRecord::Migration
  def change
    add_column :registrations, :fb_id, :string
  end
end
