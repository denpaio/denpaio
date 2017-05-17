# frozen_string_literal: true
class StatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'status'
    stream_for current_session
  end

  def reload
    status = Rails.cache.read(:status) || {}

    StatusChannel.broadcast_to(
      current_session,
      action: 'reload',
      object: status
    )
  end
end
