# frozen_string_literal: true
class PlaylistChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'playlist'
    stream_for current_session
  end

  def reload
    @last_play = Play.where.not(played_at: nil).first
    @plays = Play.where(played_at: nil).or(Play.where(id: @last_play.id)).first(10)

    PlaylistChannel.broadcast_to(
      current_session,
      action: 'reload',
      objects: @plays.as_json(include: :track)
    )
  end
end
