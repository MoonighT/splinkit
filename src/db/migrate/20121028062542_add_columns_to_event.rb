class AddColumnsToEvent < ActiveRecord::Migration
  def change
    add_column :events, :organizer, :string
    add_column :events, :organizer_desc, :string
  end
end
