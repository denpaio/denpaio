# frozen_string_literal: true

require 'active_support/concern'

module ResponseSupport
  extend ActiveSupport::Concern

  included do
    def fix_insecure_urls!(response)
      insecure_url_names.each do |attr|
        url = response[attr]
        next if url.nil?
        next if url.start_with?('https://')
        response[attr] = url.sub(%r{\Ahttp://(\w+)}, 'https://\1-ssl')
      end
    end

    def add_affiliate_token_to_view_urls!(response, app: 'iTunes', ct: 'denpa.io')
      view_url_names.each do |attr|
        url = response[attr]
        next if url.nil?
        new_uri = URI.parse(url)
        new_form_params = URI.decode_www_form(new_uri.query)
        new_form_params << ['at', ENV['ITUNES_AFFILIATE_TOKEN']]
        new_form_params << ['app', app]
        new_form_params << ['ct', ct]
        new_uri.query = URI.encode_www_form(new_form_params)
        response[attr] = new_uri.to_s
      end
    end
  end

  private

  def insecure_url_names
    %w[
      artwork_url30
      artwork_url60
      artwork_url100
      preview_url
    ]
  end

  def view_url_names
    %w[
      artist_view_url
      collection_view_url
      track_view_url
    ]
  end
end
