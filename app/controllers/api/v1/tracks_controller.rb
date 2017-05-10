# frozen_string_literal: true
class Api::V1::TracksController < ApplicationController
  respond_to :xml, :json

  before_action :authenticate, except: [:search, :browse, :random, :show]

  def search
    unless params[:q].present?
      browse
      return
    end

    songs = ITunes.music(params[:q], country: :jp, entity: :song, limit: 25)

    @object = {
      result_count: songs.result_count,
      results: songs.results.map do |result|
        add_affiliate_token_to_view_urls!(result)
        proxy_insecure_urls!(result)
        Track.find_by_identity(result.track_id) || Track.new(response: result)
      end
    }
    respond_with @object
  rescue => e
    @object = {
      error_message: e.message,
      cause: e.cause
    }
    respond_with @object, status: 422
  end

  def browse
    @tracks = Track.page(params[:page]).order(id: :desc)

    @tracks.each do |track|
      add_affiliate_token_to_view_urls!(track.response)
      proxy_insecure_urls!(track.response)
    end

    @object = {
      result_count: @tracks.total_count,
      results: @tracks
    }
    respond_with @object
  end

  def random
    @tracks = Track.page(params[:page]).order('RANDOM()')

    @tracks.each do |track|
      add_affiliate_token_to_view_urls!(track.response)
      proxy_insecure_urls!(track.response)
    end

    @object = {
      result_count: @tracks.total_count,
      results: @tracks
    }
    respond_with @object
  end

  def show
    @track = Track.find(params[:id])
    render json: @track
  end

  def update
    @track = Track.find(params[:id])
    @track.update!(track_params)
    render json: @track
  end

  private

  def track_params
    params.require(:track).permit(:file)
  end
end
