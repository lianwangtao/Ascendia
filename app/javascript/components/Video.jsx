import React from "react"
import { Link } from "react-router-dom"

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = { video: { src: "" , img: "" }, subtitles: [] }

    this.addHtmlEntities = this.addHtmlEntities.bind(this)
    this.fetchVideo = this.fetchVideo.bind(this)
    this.fetchSubtitles = this.fetchSubtitles.bind(this)
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt/g, "<")
      .replace(/&gt/g, ">")
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props
    this.fetchVideo(id)
    this.fetchSubtitles(id)
  }

  fetchVideo(id) {
    const url = `/api/v1/video/${id}`
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => this.setState({ video: response }))
      .catch(() => this.props.history.push("/videos"))
  }

  fetchSubtitles(id) {
    const url = `/api/v1/subtitles?video_id=${id}`
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => this.setState({ subtitles: response }))
      .catch(() => this.props.history.push("/videos"))
  }

  render() {
    const { video: video } = this.state
    let videoUrl = video.src
    let videoImg = video.img
    let subtitles = []
    
    this.state.subtitles.forEach((sentence) => {
      console.log(sentence)
      subtitles.push(
        <div key={sentence.id} className="card mb-4">
          <div className="card-body">
            <p>Content: {sentence.content}</p>
            <p>Start Time: {sentence.start_time}</p>
            <p>End Time: {sentence.end_time}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
            <img
            src={videoImg}
            alt={`${videoImg} image`}
                className="img-fluid position-absolute"
            />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {video.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-3 col-lg-3">
              <h5 className="mb-2">Video url</h5>
                  {videoUrl}
            </div>
            <div className="col-sm-3 col-lg-3">
              <h5 className="mb-2">Subtitles from the DB</h5>
              {subtitles}
            </div>
          </div>
          <Link to="/videos" className="btn btn-link">
            Back to videos
          </Link>
        </div>
      </div>
    )
  }
}

export default Video
