class RenameSessionToActivity < ActiveRecord::Migration
  def change
    rename_table :sessions, :activities
  end
end
