class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks, &:timestamps
  end
end
