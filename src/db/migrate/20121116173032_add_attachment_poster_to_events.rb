class AddAttachmentPosterToEvents < ActiveRecord::Migration
  def self.up
    change_table :events do |t|
      t.has_attached_file :poster
    end
  end

  def self.down
    drop_attached_file :events, :poster
  end
end
