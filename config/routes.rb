Rails.application.routes.draw do
  post 'register', to: 'api/v1/users#register'
  post 'auth/login', to: 'api/v1/users#login'
  get 'test', to: 'api/v1/users#test'

  namespace 'api' do
    namespace 'v1' do
      resources :bons
    end
  end

  root to: 'api/v1/bons#index'
end
