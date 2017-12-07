# frozen_string_literal: true

require './lib/json_web_token'

module Secured
  extend ActiveSupport::Concern

  private

  def authenticate_request!(admin: false)
    jwks_hash = auth_token
    raise JWT::VerificationError if admin && !jwks_hash.first['roles'].include?('admin')
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  def http_token
    if request.headers['Authorization'].present?
      request.headers['Authorization'].split(' ').last
    end
  end

  def auth_token
    JsonWebToken.verify(http_token)
  end
end
