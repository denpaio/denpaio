# frozen_string_literal: true

class ProxiesController < ApplicationController
  def any
    url = decrypt_by_secret_key(params[:url])
    response = HTTParty.get(url)
    send_data_by_response(response)
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    raise ActionController::RoutingError, 'Invalid Signature'
  end

  private

  def send_data_by_response(response)
    expires_in 1.year, public: true

    options = {
      status: response.code,
      type: response.content_type,
      disposition: 'inline'
    }
    send_data response.body, options
  end
end
