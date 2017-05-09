# frozen_string_literal: true
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_session

    def connect
      self.current_session = session
    end

    def session
      cookies.encrypted[Rails.application.config.session_options[:key]]
    end
  end
end
