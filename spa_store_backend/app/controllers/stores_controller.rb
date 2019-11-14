class StoresController < ApplicationController

    def index
        stores = Store.all
        render json: StoreSerializer.new(stores)
    end

    def create

    end

    def show
        store = Store.find(params[:id])
        options = {include:[:vendors, :customers, :products, :categories]}
        render json: StoreSerializer.new(store, options)
    end

    def edit

    end

    def destroy

    end
end