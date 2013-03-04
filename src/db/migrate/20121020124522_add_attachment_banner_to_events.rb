class AddAttachmentBannerToEvents < ActiveRecord::Migration
  def self.up
    change_table :events do |t|
      t.has_attached_file :banner
    end
  end

  def self.down
    drop_attached_file :events, :banner
  end
end
