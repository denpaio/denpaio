class Track < ApplicationRecord
  validates :identity, uniqueness: { scope: :provider }
end
