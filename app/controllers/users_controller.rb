class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?) && id != (?)', "%#{user_params[:user]}%", current_user.id)
    if params[:groupId].present?
      @group = Group.find(params[:groupId])
      @ids = @group.users.ids
      @users = @users.where.not(id: @ids)
    end
    respond_to do |format|
      format.html { redirect_to new_group_path}
      format.json
    end
  end

  def edit

  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:name , :email)
  end
end
