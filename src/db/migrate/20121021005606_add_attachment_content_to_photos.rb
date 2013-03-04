class AddAttachmentContentToPhotos < ActiveRecord::Migration
  def self.up
    remove_column :photos, :content
    change_table :photos do |t|
      t.has_attached_file :content
    end
  end

  def self.down
    add_column :photos, :content, :binary
    drop_attached_file :photos, :content
  end
end
