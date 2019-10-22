class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.string :image_path
      t.integer :price
      t.integer :vendor_id

      t.timestamps
    end
  end
end
