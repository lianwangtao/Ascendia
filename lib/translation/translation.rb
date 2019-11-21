# frozen_string_literal: true

require './lib/translation/connection.rb'
require './lib/translation/request.rb'
require './lib/translation/base.rb'
require 'digest'

module Translation
  class Translator < Base
    @app_id = '20191119000358501'
    @key = 'SQGlhtKvHiXJUYxE1BmB'
    @salt = '1435660288'

    def self.get_signed(word)
      full_string = '' + @app_id + word + @salt + @key
      Digest::MD5.hexdigest full_string
    end

    def self.translate(word)
      signed = get_signed(word)
      Request.get(
        "?q=#{word}&from=en&to=zh&appid=#{@app_id}&salt=#{@salt}&sign=#{signed}"
      )
    end
  end
end
