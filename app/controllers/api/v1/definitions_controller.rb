class Api::V1::DefinitionsController < ApplicationController
  def show
    if definitions
      render json: definitions
    else
      render json: definitions.errors
    end
  end

  private

  def definitions
    @definitions ||= Definition.where(subtitle_id: params[:subtitle_id])
  end
end
