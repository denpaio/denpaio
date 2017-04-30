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
end
