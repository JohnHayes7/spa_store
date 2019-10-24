class VendorsController < ApplicationController

    def create

    end
    
    def show
        v = Vendor.find(params[:id])
        render json: VendorSerializer.new(v)
    end

    def edit

    end

    def destroy

    end


end