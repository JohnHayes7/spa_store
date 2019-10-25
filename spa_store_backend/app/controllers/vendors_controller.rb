class VendorsController < ApplicationController

    def create

    end

    def show
        v = Vendor.find(params[:id])
        options = {include:[:store, :products]}
        render json: VendorSerializer.new(v, options)
    end

    def edit

    end

    def destroy

    end


end