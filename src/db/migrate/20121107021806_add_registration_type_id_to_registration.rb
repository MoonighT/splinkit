class AddRegistrationTypeIdToRegistration < ActiveRecord::Migration
  def change
    add_column :registrations, :registration_type_id, :integer
  end
end
