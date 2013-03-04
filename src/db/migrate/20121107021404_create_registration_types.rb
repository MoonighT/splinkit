class CreateRegistrationTypes < ActiveRecord::Migration
  def change
    create_table :registration_types do |t|
      t.integer :event_id
      t.string :name

      t.timestamps
    end
  end
end
