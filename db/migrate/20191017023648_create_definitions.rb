class CreateDefinitions < ActiveRecord::Migration[5.2]
  def change
    create_table :definitions do |t|
      t.string :content
      t.string :link
      t.references :subtitle, foreign_key: true

      t.timestamps
    end
  end
end
