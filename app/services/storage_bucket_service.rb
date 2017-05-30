# frozen_string_literal: true

require 'singleton'

class StorageBucketService
  include Singleton

  def initialize
    fog_storage = Fog::Storage::Google.new(
      google_storage_access_key_id: ENV['GOOGLE_STORAGE_ACCESS_KEY_ID'],
      google_storage_secret_access_key: ENV['GOOGLE_STORAGE_SECRET_ACCESS_KEY'],
      path_style: true,
      host: 'storage.googleapis.com'
    )
    @storage_bucket = fog_storage.directories.new(key: ENV['GOOGLE_STORAGE_BUCKET'])
  end

  def upload_from_path(path, directory:, filename:)
    extname = File.extname(path).delete('.')
    content_type = MIME::Types.type_for(extname).first
    destination_path = "#{directory}/#{filename}"

    object = @storage_bucket.files.new(
      key: destination_path,
      body: IO.binread(path),
      'Content-Type' => content_type
    )
    object.save
  end
end
