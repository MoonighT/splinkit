Splinkit::Application.routes.draw do

  resources :events do
    post "banner", on: :member
    post "poster", on: :member
    delete "poster" => "events#delete_poster", on: :member

    resources :programs, only: [:create, :index, :new] do
      resources :activities, only: [:create, :index, :new]
    end
    resources :speakers, only: [:create, :index, :new]
    resources :photos, only: [:create, :index, :new]
    resources :registrations, only: [:create, :index]
    resources :registration_types, only: [:create, :index]
  end

  resources :programs, only: [:update, :destroy, :show]
  resources :speakers, only: [:update, :destroy, :show] do
    post "photo", on: :member
  end
  resources :activities, only: [:update, :destroy, :show]
  resources :photos, only: [:update, :destroy, :show]
  resources :registration_types, only: [:update, :destroy]

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  root to: "home#index"
  post "create_event" => "home#create_event"
  get "my_events" => "home#my_events"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
