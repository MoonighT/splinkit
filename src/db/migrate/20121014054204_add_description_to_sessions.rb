class AddDescriptionToSessions < ActiveRecord::Migration
  def change
    add_column :sessions, :description, :string
  end
end
