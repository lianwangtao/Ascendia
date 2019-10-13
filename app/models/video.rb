class Video < ApplicationRecord
    validates :name, presence: true
    validates :src, presence: true
end
