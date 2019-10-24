class CustomersController < ApplicationController

    def create

    end

    def show
        c = Customer.find(params[:id])
        render json: CustomerSerializer.new(c)

    end

    def update

    end

    def destroy

    end

end