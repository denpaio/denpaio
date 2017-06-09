# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Track, type: :model do
  context 'with empty parameters' do
    it 'raise exception' do
      expect { Track.create! }.to raise_error ActiveRecord::RecordInvalid
    end
  end

  context 'with response' do
    track = Track.first
    preview_url = track.response['preview_url']
    artwork_url100 = track.response['artwork_url100']

    it 'has valid preview_url' do
      response = HTTParty.get(preview_url)
      expect(response.code).to eq 200
    end

    it 'has valid artwork_url100' do
      response = HTTParty.get(artwork_url100)
      expect(response.code).to eq 200
    end
  end
end
