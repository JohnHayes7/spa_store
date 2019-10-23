class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  has_many :products
end
