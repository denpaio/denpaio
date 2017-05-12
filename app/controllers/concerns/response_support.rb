# frozen_string_literal: true
require 'active_support/concern'

module ResponseSupport
  extend ActiveSupport::Concern

  included do
    def proxy_insecure_urls!(response)
      %w(artwork_url30 artwork_url60 artwork_url100 preview_url).each do |attr|
        url = response[attr]
        next if url.nil?
        next if url.start_with?('https://')
        encrypted_url = encrypt_by_secret_key(url)
        response[attr] = url_for(controller: '/proxies', action: :any, url: encrypted_url)
      end
    end

    def add_affiliate_token_to_view_urls!(response)
      %w(artist_view_url collection_view_url track_view_url).each do |attr|
        url = response[attr]
        next if url.nil?
        new_uri = URI.parse(url)
        new_form_params = URI.decode_www_form(new_uri.query)
        new_form_params << ['at', ENV['ITUNES_AFFILIATE_TOKEN']]
        new_form_params << ['app', 'iTunes']
        new_form_params << ['ct', request.host]
        new_uri.query = URI.encode_www_form(new_form_params)
        response[attr] = new_uri.to_s
      end
    end
  end
end
