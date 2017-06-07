# frozen_string_literal: true

class Track < ApplicationRecord
  has_many :plays
  validates :identity, presence: true, uniqueness: { scope: :provider }

  attr_accessor :file

  scope :requestable, -> { where.not(sha1: nil) }

  before_update :upload_file_to_storage, if: :file

  def upload_file_to_storage
    sha1 = Digest::SHA1.hexdigest IO.binread(file.path)

    directory = sha1.slice(0..1)
    extname = File.extname(file.path).delete('.')
    filename = format('%s.%s', sha1.slice(2..-1), extname)
    StorageBucketService.instance.upload_from_path(file.path, directory: directory, filename: filename)

    self.sha1 = sha1
  end
end
