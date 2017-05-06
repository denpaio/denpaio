class Api::V1::PlaysController < ApplicationController
  def index
    @plays = Play.page(params[:page]).order(played_at: :desc, id: :desc)

    @object = {
      result_count: @plays.total_count,
      results: @plays
    }
    render json: @object, include: {track: { except: :response }}
  end

  def update
    begin
      @play = Play.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      @track = Track.find(params[:track_id])
      @play = @track.plays.create!
    end

    @play.played_at ||= Time.now.utc
    @play.save!

    render json: @play, include: {track: { except: :response }}
  end
end
