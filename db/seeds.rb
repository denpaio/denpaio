# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Aimer with chelly (EGOIST) - ninelie
Rake::Task['tracks:create_or_update_by_identity'].invoke('1106341688')
Rake::Task['tracks:create_or_update_by_identity'].reenable
# MYTH & ROID - Styx Helix
Rake::Task['tracks:create_or_update_by_identity'].invoke('1112374651')
Rake::Task['tracks:create_or_update_by_identity'].reenable
# supercell - LOVE & ROLL
Rake::Task['tracks:create_or_update_by_identity'].invoke('570091034')
Rake::Task['tracks:create_or_update_by_identity'].reenable

initial_track = Track.find_by(identity: '1106341688')
initial_track.update!(sha1: 'a5cb4c93e0f4d5b8a81926b35924a0e5ab44afae')
initial_track.plays.create!(played_at: Time.zone.now)
