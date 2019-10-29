class StoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :vendors
  has_many :customers
  has_many :products, through: :vendors
end
