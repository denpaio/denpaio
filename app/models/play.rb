# frozen_string_literal: true
class Play < ApplicationRecord
  belongs_to :track

  default_scope { order(played_at: :desc, id: :desc) }

  after_create -> { broadcast_playlist('create') }
  after_update -> { broadcast_playlist('update') }, if: :played_at_changed?
  after_destroy -> { broadcast_playlist('destroy') }, unless: :played_at?

  private

  def broadcast_playlist(action)
    ActionCable.server.broadcast('playlist', {
      action: action,
      object: as_json(include: :track)
    })
  end
end
