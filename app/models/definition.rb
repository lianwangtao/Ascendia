class Definition < ApplicationRecord
  validates :link, presence: true
  validates :content, presence: true
  belongs_to :subtitle
end
