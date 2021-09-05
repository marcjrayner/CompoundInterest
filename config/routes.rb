Rails.application.routes.draw do
  devise_for :users
  resources :calculations
  # get 'home/index'
  root 'home#index'
  get 'home/about'
  post 'calculate_result', to: 'calculations#calculate_result'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
