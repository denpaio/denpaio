# frozen_string_literal: true

class Api::V1::TracksController < ApplicationController
  include Secured
  respond_to :xml, :json

  before_action :authenticate_request!, except: [:search, :browse, :random, :show]

  def search
    if params[:q].blank?
      browse
      return
    end

    songs = ITunes.music(params[:q], country: :jp, entity: :song, limit: 50)

    @object = {
      result_count: songs.result_count,
      result_limit: 50,
      results: songs.results.map do |result|
        Track.find_by(identity: result.track_id) || Track.new(response: result).tap do |t|
          fix_insecure_urls!(t.response)
          add_affiliate_token_to_view_urls!(t.response)
        end
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
    @tracks = Track.page(params[:page]).per(50).order(id: :desc)

    @object = {
      result_count: @tracks.total_count,
      result_limit: 50,
      results: @tracks
    }
    respond_with @object
  end

  def random
    last_cycle_played_at = Play.first(Track.requestable.count).last.played_at
    plays_join_subquery = format(
      %{LEFT OUTER JOIN (%s) "plays" ON "plays"."track_id" = "tracks"."id"},
      Play.where.not(Play.arel_table[:played_at].lt(last_cycle_played_at)).to_sql
    )

    @tracks = Track.requestable.
              select(%{"tracks".*, COUNT("plays"."id") AS "id_count"}).
              joins(plays_join_subquery).
              group(:id).
              order(%{"id_count", RANDOM()}).
              page(params[:page])

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
