Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

resources :stores

get '/vendors/:id' => 'vendors#show'

resources :customers

get '/products/:id' => 'products#show'

get '/customers/:id' => 'customers#show'

end
