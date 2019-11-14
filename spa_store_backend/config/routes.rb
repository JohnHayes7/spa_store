Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

resources :stores

get '/vendors/:id' => 'vendors#show'

resources :customers, only:[:show] do 
  resources :carts, only:[:update, :destroy, :show]
end

get '/products/:id' => 'products#show'

get 'categories/:id' => 'categories#show'



end
