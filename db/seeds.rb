# frozen_string_literal: true

# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Populate videos

video_urls = [
  'https://res.cloudinary.com/dswnxi1zx/video/upload/v1573438264/A_bit_of_China_-_Trailer_y4fk4n.mp4'
]

video_imgs = [
  'https://n.sinaimg.cn/finance/transform/266/w550h516/20190207/7nO9-hsqyiwu0890184.jpg'
]

Video.create(
  name: '流浪地球',
  src: video_urls[0],
  img: video_imgs[0]
)

all_videos = Video.all

# Populate subtitles

file = SRT::File.parse(File.new('./storage/The.Wandering.Earth.srt'))
file.lines.each do |line|
  line.text.each do |sentence|
    Subtitle.create(
      start_time: line.start_time,
      end_time: line.end_time,
      content: sentence.to_s,
      video: all_videos[0]
    )
  end
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
