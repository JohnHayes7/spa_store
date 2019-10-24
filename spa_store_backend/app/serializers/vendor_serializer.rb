class VendorSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :tagline
  belongs_to :store
  has_many :products
end
