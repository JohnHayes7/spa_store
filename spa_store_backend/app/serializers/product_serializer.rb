class ProductSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :price
  belongs_to :vendor
  belongs_to :category
  has_many :carts
  has_many :customers, through: :carts
end
