# frozen_string_literal: true
class Api::V1::NightbotController < ApplicationController
  def execute
    # Usage: !songs current/delete/list/playlist/next/request/skip/save/promote/volume/play/pause

    case params[:q]
    when 'current'
      track = Play.where.not(played_at: nil).first.track
      render text: format('Now playing: %s - %s', track.artist, track.name)
    when 'playlist', 'request'
      render text: 'TODO'
    else
      render text: 'Usage: !songs current|playlist|request'
    end
  end
end
