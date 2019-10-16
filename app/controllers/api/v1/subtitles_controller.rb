class Api::V1::SubtitlesController < ApplicationController
  def show
    if subtitles
      render json: subtitles
    else
      render json: subtitles.errors
    end
  end

  private

  def subtitles
    @subtitles ||= Subtitle.where(video_id: params[:video_id])
  end
end
