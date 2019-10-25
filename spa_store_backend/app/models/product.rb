class Product < ApplicationRecord
    belongs_to :vendor
    belongs_to :category
    has_and_belongs_to_many :carts
    has_many :customers, through: :carts


end
