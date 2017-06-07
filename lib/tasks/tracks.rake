# frozen_string_literal: true

require_relative '../../app/controllers/concerns/response_support'

namespace :tracks do
  include ResponseSupport

  desc 'Create or update by identity'
  task :create_or_update_by_identity, [:identity] => :environment do |_t, args|
    identity = args.identity

    response = ITunes.lookup(identity, country: :jp, entity: :song, limit: 1)['results'].first
    name = response.track_name
    artist = response.artist_name

    fix_insecure_urls!(response)
    add_affiliate_token_to_view_urls!(response)

    track = Track.find_or_initialize_by(identity: identity)
    track.assign_attributes(
      response: response,
      name: name,
      artist: artist
    )
    track.save!
  end

  desc 'Update response'
  task :update_response, [:track_id] => :environment do |_t, args|
    track = Track.find(args.track_id)

    response = ITunes.lookup(track.identity, country: :jp, entity: :song, limit: 1)['results'].first
    name = response.track_name
    artist = response.artist_name

    fix_insecure_urls!(response)
    add_affiliate_token_to_view_urls!(response)

    track.update!(
      response: response,
      name: name,
      artist: artist
    )
  end

  desc 'Update all responses'
  task update_all_responses: :environment do
    Track.find_each do |track|
      Rake::Task['tracks:update_response'].reenable
      Rake::Task['tracks:update_response'].invoke(track.id)
    end
  end
end
