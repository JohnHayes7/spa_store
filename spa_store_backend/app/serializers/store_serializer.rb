class StoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :vendors
  has_many :customers
end
