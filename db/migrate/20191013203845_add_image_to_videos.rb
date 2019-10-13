class AddImageToVideos < ActiveRecord::Migration[5.2]
  def change
    add_column :videos, :img, :string
  end
end
