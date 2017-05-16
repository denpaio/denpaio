# frozen_string_literal: true
class Api::V1::CachesController < ApplicationController
  before_action :authenticate

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
end
