class Product < ApplicationRecord
    belongs_to :vendor
    has_many :categories
    has_many :carts
    has_many :customers, through: :carts


end
