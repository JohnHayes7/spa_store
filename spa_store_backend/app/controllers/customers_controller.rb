class CustomersController < ApplicationController

    def create

    end

    def show
        c = Customer.find(params[:id])
        options = {include:[:store, :cart, :products]}
        render json: CustomerSerializer.new(c, options)
    end

    def update

    end

    def destroy

    end

end