# frozen_string_literal: true

load('./lib/translation/translation.rb')

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
    translator = Translation::Translator
    @definitions ||= translator.translate(params[:word])
  end
end
