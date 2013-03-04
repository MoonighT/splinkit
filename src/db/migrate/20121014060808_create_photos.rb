class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.binary :content

      t.timestamps
    end
  end
end
