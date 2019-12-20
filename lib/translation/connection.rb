# frozen_string_literal: true

require 'faraday'
require 'json'

class Connection
  BASE = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

  def self.api
    Faraday.new(url: BASE) do |faraday|
      faraday.response :logger
      faraday.adapter Faraday.default_adapter
      faraday.headers['Content-Type'] = 'application/json'
    end
  end
end
