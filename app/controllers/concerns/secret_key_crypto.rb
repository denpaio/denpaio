# frozen_string_literal: true

require 'active_support/concern'

module SecretKeyCrypto
  extend ActiveSupport::Concern

  included do
    def encrypt_by_secret_key(value)
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base)
      crypt.encrypt_and_sign(value)
    end

    def decrypt_by_secret_key(value)
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base)
      crypt.decrypt_and_verify(value)
    end
  end
end
