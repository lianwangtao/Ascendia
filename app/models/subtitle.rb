class Subtitle < ApplicationRecord
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :content, presence: true
  belongs_to :video
end
