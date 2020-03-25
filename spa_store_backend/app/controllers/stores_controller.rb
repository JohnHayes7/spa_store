class StoresController < ApplicationController

    def index
        stores = Store.all
        render json: { status: "Welcome", message: "Welcome to the Spa-Store-API"}
    end

    def create

    end

    def show
        store = Store.find(params[:id])
        if store
            options = {include:[:vendors, :customers, :products, :categories]}
            render json: StoreSerializer.new(store, options)
        else
            render json: {status: "error", message: "Cannot find store with id #{params[:id]}"}
        end
    end

    def edit

    end

    def destroy

    end
end