class CustomerSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :store
  has_one :cart
end
