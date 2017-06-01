# frozen_string_literal: true

namespace :tracks do
  desc "Create or update by identity"
  task :create_or_update_by_identity, [:identity] => :environment do |_t, args|
    identity = args.identity

    response = ITunes.lookup(identity, country: :jp, entity: :song, limit: 1)['results'].first
    name = response.track_name
    artist = response.artist_name

    track = Track.find_or_initialize_by(identity: identity)
    track.assign_attributes(
      response: response,
      name: name,
      artist: artist
    )
    track.save!
  end
end
