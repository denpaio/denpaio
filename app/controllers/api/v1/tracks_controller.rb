# frozen_string_literal: true
class Api::V1::TracksController < ApplicationController
  respond_to :xml, :json

  def search
    itunes = ITunes::Client.new
    songs = itunes.music(params[:q], country: :jp, entity: :song, limit: 25)
    @object = add_affiliate_token_to_view_urls(proxy_all_insecure_urls(songs))
    respond_with :api, :v1, @object
  rescue => e
    @object = {
      error_message: e.message,
      cause: e.cause
    }
    respond_with :api, :v1, @object, status: 422
  end

  def proxy_all_insecure_urls(songs)
    songs.tap do |s|
      s.results.to_a.each do |result|
        %w(artwork_url30 artwork_url60 artwork_url100 preview_url).each do |attr|
          url = result[attr]
          next if url.nil?
          next if url.start_with?('https://')
          encrypted_url = encrypt_by_secret_key(url)
          result[attr] = url_for(controller: '/proxies', action: :any, url: encrypted_url)
        end
      end
    end
  end

  def add_affiliate_token_to_view_urls(songs)
    songs.tap do |s|
      s.results.to_a.each do |result|
        %w(artist_view_url collection_view_url track_view_url).each do |attr|
          url = result[attr]
          next if url.nil?
          new_uri = URI.parse(url)
          new_form_params = URI.decode_www_form(new_uri.query)
          new_form_params << ['at', ENV['ITUNES_AFFILIATE_TOKEN']]
          new_form_params << ['app', 'iTunes']
          new_uri.query = URI.encode_www_form(new_form_params)
          result[attr] = new_uri.to_s
        end
      end
    end
  end
end
