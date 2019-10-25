class ProductSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :price
  belongs_to :vendor
  has_many :categories_products
  has_many :categories, through: :categories_products
  has_many :carts
  has_many :customers, through: :carts
end
