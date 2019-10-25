class CartSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :customer
  has_many :
  has_many :products
end
