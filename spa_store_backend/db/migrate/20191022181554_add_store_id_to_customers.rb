class AddStoreIdToCustomers < ActiveRecord::Migration[6.0]
  def change
    add_column :customers, :store_id, :integer
  end
end
