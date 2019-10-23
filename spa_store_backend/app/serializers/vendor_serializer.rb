class VendorSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :store
  has_many :products
end
