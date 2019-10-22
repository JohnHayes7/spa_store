class Customer < ApplicationRecord
    belongs_to :store
    has_one :cart
end
