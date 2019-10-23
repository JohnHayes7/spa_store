class StoreSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  has_many :vendors
  has_many :customers
end
