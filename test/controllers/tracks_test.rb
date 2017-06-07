# frozen_string_literal: true

require 'test_helper'

class Api::V1::TracksControllerTest < ActionController::TestCase
  ITUNES_AFFILIATE_TOKEN = ENV['ITUNES_AFFILIATE_TOKEN']

  test '#search' do
    title = Track.first.name
    get :search, format: 'json', params: { q: title }
    assert_itunes_response(response)
  end

  test '#browse' do
    get :search, format: 'json'
    assert_itunes_response(response)
  end

  test '#random' do
    get :random, format: 'json'
    assert_itunes_response(response)
  end

  private

  def assert_itunes_response(response)
    json = JSON.parse(response.body)

    assert ITUNES_AFFILIATE_TOKEN
    assert json['results'][0]['response']['track_view_url'].include?("at=#{ITUNES_AFFILIATE_TOKEN}")
    assert_not response.body.include?('http://')
    assert_equal json['results'].size, json['result_count']
    assert_response :success
  end
end
