# frozen_string_literal: true

class Api::V1::NightbotController < ApplicationController
  def execute
    # Usage: !songs current/delete/list/playlist/next/request/skip/save/promote/volume/play/pause

    case params[:q]
    when 'current'
      track = Play.where.not(played_at: nil).first.track
      render text: format('Now playing: %s - %s', track.artist, track.name)
    when 'playlist'
      plays = Play.where(played_at: nil)
      render text: plays.map { |play| play.track.name }.reverse.inspect
    when /request\s+(?<name>.+)/
      name = Regexp.last_match(:name)
      track = Track.find_by(name: name)

      if track
        track.plays.create!
        render text: format('Track name `%s\' successful requested', name)
      else
        render text: format('Track name `%s\' not found', name)
      end
    else
      render text: 'Usage: !songs current|playlist|request'
    end
  end
end
