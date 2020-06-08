Rails.application.routes.draw do
  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
     
      resources :auctions, only: [:index, :show, :create]
      resources :bids, only: [:create]

      resource :session, only: [:create, :destroy]
      get("/users/current", to: "sessions#current")
    end
  end
    
end
