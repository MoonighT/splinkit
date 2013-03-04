class AddIndexesToUsers < ActiveRecord::Migration
  def change
    add_index :users, :uid, unique: true
  end
end
