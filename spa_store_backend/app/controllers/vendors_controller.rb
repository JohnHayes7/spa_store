class VendorsController < ApplicationController

    def show
        v = Vendor.find(params[:id])
        render json: VendorSerializer.new(v)
    end


end