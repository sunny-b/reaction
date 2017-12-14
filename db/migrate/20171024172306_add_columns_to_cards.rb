class AddColumnsToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :archived, :boolean
    add_column :cards, :completed, :boolean
  end
end
