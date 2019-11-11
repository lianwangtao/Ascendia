import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import VideoPlayer from "./Player"
import * as videoActions from "../packs/actions"

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      video: { src: "" , img: "" }, 
    }

    this.addHtmlEntities = this.addHtmlEntities.bind(this)
    this.fetchVideo = this.fetchVideo.bind(this)
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
    this.props.fetchSubtitles(id)
    this.props.fetchDefinitions(id)
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

  render() {
    const { video: video } = this.state
    let videoUrl = video.src
    let videoImg = video.img
    let subtitles = []
    let definitions = this.props.definitions
    console.log(this.props.subtitles)
    
    if (this.props.subtitles) {
      this.props.subtitles.forEach((sentence) => {
        subtitles.push(
          <div key={sentence.id} className="card mb-4">
            <div className="card-body">
              <p>Content: {sentence.content}</p>
              <p>Start Time: {sentence.start_time}</p>
              <p>End Time: {sentence.end_time}</p>
              <h5>Definitions</h5>
              {/* <p key={definitions[sentence.id].content}>{definitions[sentence.id].content}</p> */}
            </div>
          </div>
        )
      })
    }

    return (
      <div className="">
        <div className="row d-flex align-items-center justify-content-center video-player-wrapper">
          <VideoPlayer video_source={videoUrl} />
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-3 col-lg-3">
              <h4 className="mb-2">Subtitles from the DB</h4>
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

const mapStateToProps = state => {
  return {
    definitions: state.definitions,
    subtitles: state.subtitles
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(Video)
