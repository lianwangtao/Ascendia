class AddContentToSubtitles < ActiveRecord::Migration[5.2]
  def change
    add_column :subtitles, :content, :text
  end
end
