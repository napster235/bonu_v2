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
      render :index
    else
      render :edit
    end
  end

  def update
    @bon = Bon.find_by_id(params[:id])
    if @bon.nil? || @bon.update(bon_params)
      render :index
    else
      render :edit
    end
  end

  def destroy
    @bon = Bon.find_by_id(params[:id])
    if @bon.nil?
      render :index
    else
      @bon.destroy
      render json: Bon.all
    end
  end

  private

  def bon_params
    params.require(:bon).permit(:purchase_date, :amount, :notes, :user_id)
  end
end
