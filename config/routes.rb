Rails.application.routes.draw do
  post 'authenticate', to: 'api/v1/users#register'

  namespace 'api' do
    namespace 'v1' do
      resources :bons
    end
  end

  root to: 'api/v1/bons#index'
end
