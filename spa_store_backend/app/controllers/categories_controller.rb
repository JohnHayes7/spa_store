class CategoriesController < ApplicationController
    
    def show
        cat = Category.find(params[:id])
        options = {include:[:products, :vendor]}
        render json: CategorySerializer.new(cat, options)
    end
end