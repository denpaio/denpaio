class CreatePlays < ActiveRecord::Migration[5.0]
  def change
    create_table :plays do |t|
      t.references :track, foreign_key: true
      t.datetime :played_at

      t.timestamps
    end

    add_index :plays, :played_at, where: 'played_at IS NULL'
  end
end
