class Api::V1::SessionsController < Api::ApplicationController
    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: { id: user.id }
        else
          render json: { message: "you failed to log in" }, status: 404
        end
      end
    def current
      render(json: current_user)
    end
    def destroy
        session[:user_id] = null;
    end
end
