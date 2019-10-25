class Category < ApplicationRecord
    has_many :products
    has_many :product_categories
    has_many :categories, through: :product_categories
end
