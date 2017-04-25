class DanmakuChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
  end

  def receive(data)
    data['top'] = format('%f%', Random.rand * 100)
    ActionCable.server.broadcast('messages', data)
  end
end
