Rails.application.routes.draw do
  root to: 'welcome#index'

  post "/graphql", to: "graphql#execute"
  post 'register', to: 'api/v1/users#register'
  post 'auth/login', to: 'api/v1/users#login'

  namespace 'api' do
    namespace 'v1' do
      resources :bons
    end
  end
end
