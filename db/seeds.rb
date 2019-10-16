# frozen_string_literal: true

# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Populate videos

video_urls = [
  'https://www.youtube.com/watch?v=ylLTMYt24lA',
  'https://www.youtube.com/watch?v=5Wq0yv73NpY',
  'https://www.youtube.com/watch?v=JR4KHfqw-oE',
  'https://www.youtube.com/watch?v=6OceuTkSYNo'
]

video_imgs = [
  'http://i3.ytimg.com/vi/ylLTMYt24lA/maxresdefault.jpg',
  'http://i3.ytimg.com/vi/5Wq0yv73NpY/maxresdefault.jpg',
  'http://i3.ytimg.com/vi/JR4KHfqw-oE/maxresdefault.jpg',
  'http://i3.ytimg.com/vi/6OceuTkSYNo/maxresdefault.jpg'
]

4.times do |i|
  Video.create(
    name: "Video #{i + 1}",
    src: video_urls[i],
    img: video_imgs[i]
  )
end

all_videos = Video.all

# Populate subtitles

5.times do |i|
  Subtitle.create(
    start_time: "0:0#{i}",
    end_time: "0.0#{i+1}",
    content: "This is the ##{i} subtitle",
    video: all_videos[0]
  )
end
