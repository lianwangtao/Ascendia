# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'subtitles', to: 'subtitles#show'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'videos/index'
      post 'vidoes/create'
      get 'video/:id', to: 'videos#show'
      delete 'destroy/:id', to: 'videos#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
