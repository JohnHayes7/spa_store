class Product < ApplicationRecord
    belongs_to :vendor
    has_many :product_categories
    has_many :categories, through: :product_categories
    has_many :carts
    has_many :customers, through: :carts


end
