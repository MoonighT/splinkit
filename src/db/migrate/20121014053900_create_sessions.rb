class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.time :time
      t.string :topic

      t.timestamps
    end
  end
end
