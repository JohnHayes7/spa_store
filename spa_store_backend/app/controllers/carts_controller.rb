class CartsController < ApplicationController

        def create

        end

        def show
            cart = Cart.find(1)
            options = { include: [:customer, :products]}
            render json: CartSerializer.new(cart, options)

        end

        def update
            binding.pry

        end

        def delete

        end

end