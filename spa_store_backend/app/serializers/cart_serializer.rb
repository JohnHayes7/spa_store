class CartSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :customer
  has_and_belongs_to_many :products
end
