# frozen_string_literal: true

class DanmakuChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
    stream_for current_session
  end

  def create(data)
    data['id'] = format('%d', Time.now.to_f * 1000)
    data['top'] = format('%f%', Random.rand * 100)

    last_play = Play.where.not(played_at: nil).first
    data['playing'] = last_play.as_json(include: :track)

    Rails.cache.write(
      'danmaku_object', data,
      namespace: Time.now.to_f,
      expires_in: 24.hours
    )

    ActionCable.server.broadcast('messages', data)
  end

  def reload
    rails_cache_keys = Rails.cache.instance_variable_get(:@data).try(:keys) || []
    danmaku_object_keys = rails_cache_keys.select do |key|
      key =~ /(?::danmaku_object)\z/
    end.sort
    objects = Rails.cache.read_multi(*danmaku_object_keys).values

    DanmakuChannel.broadcast_to(
      current_session,
      action: 'reload',
      objects: objects
    )
  end
end
