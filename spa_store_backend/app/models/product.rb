class Product < ApplicationRecord
    belongs_to :vendor
    has_many :categories_products
    has_many :categories, through: :categories_products
    has_many :carts
    has_many :customers, through: :carts


end
