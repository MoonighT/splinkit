class AddProgramIdToSessions < ActiveRecord::Migration
  def change
    add_column :sessions, :program_id, :integer
  end
end
