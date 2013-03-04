class CreateSpeakers < ActiveRecord::Migration
  def change
    create_table :speakers do |t|
      t.string :name
      t.string :position
      t.string :description

      t.timestamps
    end
  end
end
