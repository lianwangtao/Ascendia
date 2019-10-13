class Video < ApplicationRecord
    validates :name, presence: true
    validates :src, presence: true
    validates :img, presence: true
end
