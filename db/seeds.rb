# frozen_string_literal: true

# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Populate videos

video_urls = [
  'https://res.cloudinary.com/dswnxi1zx/video/upload/v1573438264/A_bit_of_China_-_Trailer_y4fk4n.mp4',
  'https://res.cloudinary.com/dswnxi1zx/video/upload/v1573438264/A_bit_of_China_-_Trailer_y4fk4n.mp4',
  'https://res.cloudinary.com/dswnxi1zx/video/upload/v1573438264/A_bit_of_China_-_Trailer_y4fk4n.mp4',
  'https://res.cloudinary.com/dswnxi1zx/video/upload/v1573438264/A_bit_of_China_-_Trailer_y4fk4n.mp4'
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

# Populate defintions

all_subtitles = Subtitle.all

5.times do |i|
  Definition.create(
    content: "This is the ##{i} defintion",
    link: "https://www.wikipedia.com",
    subtitle: all_subtitles[0]
  )
end
