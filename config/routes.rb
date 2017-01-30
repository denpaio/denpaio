# frozen_string_literal: true
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :tracks do
        get :search, on: :collection
      end
    end
  end
end
