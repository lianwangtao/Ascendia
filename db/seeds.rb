# frozen_string_literal: true

# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

video_urls = [
  'https://www.youtube.com/watch?v=ylLTMYt24lA',
  'https://www.youtube.com/watch?v=5Wq0yv73NpY',
  'https://www.youtube.com/watch?v=JR4KHfqw-oE',
  'https://www.youtube.com/watch?v=6OceuTkSYNo'
]

4.times do |i|
  Video.create(
    name: "Video #{i + 1}",
    src: video_urls[i]
  )
end
