class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :products
  has_many :categories_products
  has_many :categories, through: :categories_products
end
