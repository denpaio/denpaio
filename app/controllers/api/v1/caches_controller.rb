# frozen_string_literal: true
class Api::V1::CachesController < ApplicationController
  before_action :authenticate
  after_action :update_listener_count, only: :create

  def create
    key = request.POST[:key]
    value = JSON.parse(request.POST[:value], quirks_mode: true)
    namespace = request.POST[:namespace]
    expires = request.POST[:expires] || 1.hour

    return_value = Rails.cache.write(
      key, value,
      namespace: namespace,
      expires_in: expires
    )

    respond_to do |format|
      format.json { render json: return_value }
      format.any { head :not_found }
    end
  end

  private

  def update_listener_count
    total_listeners = 0

    rails_cache_keys = Rails.cache.instance_variable_get(:@data).try(:keys) || []
    icecast_status_keys = rails_cache_keys.select do |key|
      key =~ /(?:\Aicecast_status|:icecast_status)\z/
    end

    icecast_status_keys.each do |icecast_status_key|
      icecast_status = Rails.cache.read(icecast_status_key)
      next unless icecast_status
      icecast_sources = icecast_status['icestats']['source']
      icecast_denpaio_sources = Array(icecast_sources).select do |source|
        source['listenurl'] =~ %r{/denpaio(?:\.\w+)?\z}
      end
      listeners = icecast_denpaio_sources.map { |source| source['listeners'] }.inject(0, :+)
      total_listeners += listeners
    end

    items = {
      listener_count: total_listeners,
      updated_at: Time.zone.now
    }

    Rails.cache.write(:status, items, expires_in: 30.minutes)

    ActionCable.server.broadcast(
      'status',
      action: 'reload',
      object: items
    )
  end
end
