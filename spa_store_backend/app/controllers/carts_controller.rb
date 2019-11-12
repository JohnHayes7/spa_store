class CartsController < ApplicationController

        def create

        end

        def show
            cart = Cart.find(1)
            options = { include: [:customer, :products]}
            render json: CartSerializer.new(cart, options)

        end

        def update
            cart = Cart.find(params[:cart_id])
            product = Product.find(params[:product_id])
            if !cart.products.include?(product)
                cart.products << product
                cart.save
            end
            options = {include: [:customer, :products]}
            render json: CartSerializer.new(cart, options)
        end

        def remove
            raise params.inspect
            

        end

        def destroy
            cart = Cart.find(params[:cart_id])
            product = Product.find(params[:product_id])
            cart.products.delete(product)
            cart.save
            options = {include: [:customer, :products]}
            render json: CartSerializer.new(cart, options)
            
        end

end