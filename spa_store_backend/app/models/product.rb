class Product < ApplicationRecord
    belongs_to :vendor
    has_many :categories
    has_many :carts
end
