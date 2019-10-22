class CreateVendors < ActiveRecord::Migration[6.0]
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :tagline
      t.integer :store_id

      t.timestamps
    end
  end
end
