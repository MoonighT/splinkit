class AddEventIdToPrograms < ActiveRecord::Migration
  def change
    add_column :programs, :event_id, :integer
  end
end
