# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Play, type: :model do
  context 'with empty parameters' do
    it 'raise exception' do
      expect { Play.create! }.to raise_error ActiveRecord::RecordInvalid
    end
  end
end
