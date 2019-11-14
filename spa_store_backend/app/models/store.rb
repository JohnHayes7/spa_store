class Store < ApplicationRecord
    has_many :vendors
    has_many :customers
    has_many :products, through: :vendors
    has_many :categories, through: :products
end
