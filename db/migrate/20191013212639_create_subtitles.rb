class CreateSubtitles < ActiveRecord::Migration[5.2]
  def change
    create_table :subtitles do |t|
      t.string :start_time
      t.string :end_time
      t.references :video, foreign_key: true

      t.timestamps
    end
  end
end
