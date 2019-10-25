class Customer < ApplicationRecord
    belongs_to :store
    has_one :cart
    has_many :products, through: :cart
end
