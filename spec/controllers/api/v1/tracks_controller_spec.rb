# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TracksController, type: :controller do
  ITUNES_AFFILIATE_TOKEN = ENV['ITUNES_AFFILIATE_TOKEN']

  describe '#search' do
    it 'render tracks' do
      title = Track.first.name
      get :search, format: :json, params: { q: title }
      expect_itunes_reponse(response)
    end
  end

  describe '#browse' do
    it 'render tracks' do
      get :search, format: :json
      expect_itunes_reponse(response)
    end
  end

  describe '#random' do
    it 'render tracks' do
      get :random, format: :json
      expect_itunes_reponse(response)
    end
  end

  private

  def expect_itunes_reponse(response)
    expect(ITUNES_AFFILIATE_TOKEN).to be_truthy
    expect(response).to be_success
    expect(response.body).not_to include('http://')

    json = JSON.parse(response.body)
    result_count = json['result_count']
    results = json['results']
    track_view_url = results[0]['response']['track_view_url']

    expect(results.size).to equal(result_count)
    expect(track_view_url).to include("at=#{ITUNES_AFFILIATE_TOKEN}")
  end
end
