class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :interests
      t.integer :store_id

      t.timestamps
    end
  end
end
