# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PlaysController, type: :controller do

  describe '#index' do
    it 'render plays' do
      get :index, format: :json

      json = JSON.parse(response.body)
      result_count = json['result_count']
      results = json['results']
      track = results[0]['track']

      expect(response).to be_success
      expect(track).to be_nil
    end

    it 'render plays with tracks' do
      get :index, format: :json, params: { include: 'track' }

      json = JSON.parse(response.body)
      result_count = json['result_count']
      results = json['results']
      track = results[0]['track']
      track_id = track['id']
      track_name = track['name']
      track_response = track['response']

      expect(response).to be_success
      expect(track_name).to eq Track.find(track_id).name
      expect(track_response).not_to be_nil
    end

    it 'render plays with tracks except response' do
      get :index, format: :json, params: { include: { track: { except: :response } } }

      json = JSON.parse(response.body)
      result_count = json['result_count']
      results = json['results']
      track = results[0]['track']
      track_id = track['id']
      track_name = track['name']
      track_response = track['response']

      expect(response).to be_success
      expect(track_name).to eq Track.find(track_id).name
      expect(track_response).to be_nil
    end
  end
end
