class ProductsController < ApplicationController

    def create

    end

    def show
        p = Product.find(params[:id])
        options = {include:[:vendor, :categories, :carts, :customers]}
        render json: ProductSerializer.new(p, options)

    end

    def update

    end

    def delete

    end

end