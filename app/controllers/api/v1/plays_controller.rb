# frozen_string_literal: true

class Api::V1::PlaysController < ApplicationController
  before_action :authenticate, except: [:index, :create]

  def index
    @plays = Play.page(params[:page])

    @object = {
      result_count: @plays.total_count,
      results: @plays
    }
    # render plain: params.permit(include: {}).to_h.deep_symbolize_keys[:include].inspect
    render json: @object, include: include_params
  end

  def create
    @track = Track.find(params[:track_id])
    raise unless @track.sha1?
    @play = @track.plays.create!

    render json: @play, include: include_params
  end

  def update
    begin
      @play = Play.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      @track = Track.find(params[:track_id])
      @play = @track.plays.build
    end

    @play.played_at ||= Time.now.utc
    @play.save!

    render json: @play, include: include_params
  end

  private

  def include_params
    params.permit(:include)[:include] ||
      params.permit(include: {}).to_h.deep_symbolize_keys[:include]
  end
end
