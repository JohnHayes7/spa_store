class CustomerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  belongs_to :store
  has_one :cart
end
