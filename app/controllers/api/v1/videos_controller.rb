class Api::V1::VideosController < ApplicationController
  def index
    video = Video.all.order(created_at: :desc)
    render json: video
  end

  def create
    video = Video.create!(video_params)
    if video
      render json: video
    else
      render json: video.errors
    end
  end

  def show
    if video
      render json: video
    else
      render json: video.errors
    end
  end

  private

  def video_params
    params.permit(:name, :src)
  end

  def video
    @video ||= Video.find(params[:id])
  end

end
