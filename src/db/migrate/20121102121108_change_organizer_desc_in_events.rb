class ChangeOrganizerDescInEvents < ActiveRecord::Migration
  def up
    change_column :events, :organizer_desc, :text, limit: nil
  end
  def down
    change_column :events, :organizer_desc, :string
  end
end
