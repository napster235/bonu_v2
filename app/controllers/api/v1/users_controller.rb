class Api::V1::UsersController < ApplicationController
  # skip_before_action :authenticate_request, only: %i[login register]

  def register
    @user = User.create(user_params)

    if @user.save
      response = { message: 'User created successfully' }
      render json: response, status: :created
    else
      render json: @user.errors, status: :forbidden
    end
  end

  def login
    authenticate params[:email], params[:password]
  end

  private

  def user_params
    params.permit(
        :name,
        :email,
        :password
    )
  end

  def authenticate(email, password)
    command = AuthenticateUser.call(email, password)

    if command.success?
      render json: {
          access_token: command.result,
          message: 'Login Successful'
      }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
end
