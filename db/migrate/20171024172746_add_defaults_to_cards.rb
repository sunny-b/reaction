class AddDefaultsToCards < ActiveRecord::Migration[5.1]
  def change
    change_column :cards, :archived, :boolean, default: false
    change_column :cards, :completed, :boolean, default: false
  end
end
