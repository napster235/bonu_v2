require "rails/application_controller"
class WelcomeController < Rails::ApplicationController
  layout false

  def index
    append_view_path "public"

    render template: "index.html.erb"
  end
end
