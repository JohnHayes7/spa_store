class Store < ApplicationRecord
    has_many :vendors
    has_many :customers
    has_many :products, through: :vendors
end
