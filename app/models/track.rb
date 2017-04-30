class Track < ApplicationRecord
  has_many :plays
  validates :identity, uniqueness: { scope: :provider }
end
