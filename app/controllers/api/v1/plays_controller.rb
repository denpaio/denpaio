class Api::V1::PlaysController < ApplicationController
  def index
    @plays = Play.page(params[:page]).order(played_at: :desc, id: :desc)

    @object = {
      result_count: @plays.total_count,
      results: @plays
    }
    render json: @object, include: {track: { except: :response }}
  end

  def create
    begin
      @play = Play.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      raise unless params[:track_sha1].present?
      @track = Track.find_by_sha1!(params[:track_sha1])
      @play = @track.plays.create!
    end

    @play.played_at ||= Time.now.utc
    @play.save!

    render json: @play, include: {track: { except: :response }}
  end
end
