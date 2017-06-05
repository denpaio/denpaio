# frozen_string_literal: true

class DanmakuChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
    stream_for current_session
  end

  def create(data)
    data['top'] = format('%f%', Random.rand * 100)

    Rails.cache.write(
      'danmaku_object', data,
      namespace: Time.now.to_f,
      expires_in: 6.hours
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
