class Card < ApplicationRecord
  validates_presence_of :title, :list_id, :position

  belongs_to :list
  has_many :comments
  has_many :labelizations
  has_many :labels, through: :labelizations
end
