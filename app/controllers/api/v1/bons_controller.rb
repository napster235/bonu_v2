class Api::V1::BonsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  def index
    @bon = Bon.all
    render json: @bon
  end

  def show
    @bon = Bon.find_by_id(params[:id])
    render json: @bon
  end

  def new
    @new_bon = Bon.new
  end

  def create
    @new_bon = Bon.create(bon_params)
  end

  def edit
    @bon = Bon.find_by_id(params[:id])
    if @bon.nil?
      redirect_to root
    else
      render :edit
    end
  end

  def update
    @bon = Bon.find_by_id(params[:id])
    if @bon.nil? || @bon.update(bon_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    @bon = Bon.find_by_id(params[:id])
    if @bon.nil?
      redirect_to root_path
    else
      @bon.destroy
      redirect_to root_path
    end
  end

  private

  def bon_params
    params.require(:bon).permit(:purchase_date, :amount, :notes)
  end
end
