class AddProviderColumnsToTracks < ActiveRecord::Migration[5.0]
  def change
    add_column :tracks, :identity, :string
    add_column :tracks, :provider, :string, default: 'itunes', null: false
    add_column :tracks, :response, :jsonb, default: {}, null: false
    add_column :tracks, :sha1, :string, limit: 40
    add_column :tracks, :name, :string
    add_column :tracks, :artist, :string
  end
end
