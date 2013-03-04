class CreateEventTabs < ActiveRecord::Migration
  def change
    create_table :event_tabs do |t|
      t.string :title
      t.text :content
      t.integer :event_id

      t.timestamps
    end
  end
end
