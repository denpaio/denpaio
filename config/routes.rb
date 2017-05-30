# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :tracks do
        get :search, on: :collection
        get :random, on: :collection
      end

      resources :plays do
        patch :index, action: :update, on: :collection
      end

      resources :caches

      get :nightbot, to: 'nightbot#execute'
    end
  end

  get 'proxy/*url' => 'proxies#any', format: false

  # TODO: Improve 404 pages
  match '*path', to: 'pages#index', via: :all
end
