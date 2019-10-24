class StoresController < ApplicationController

    def index
        stores = Store.all
        render json: StoreSerializer.new(stores)
    end

    def create

    end

    def show
        store = Store.find(params[:id])
        render json: StoreSerializer.new(store)
    end

    def edit

    end

    def destroy

    end



end