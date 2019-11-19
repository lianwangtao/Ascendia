import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import VideoPlayer from "./Player"
import * as videoActions from "../packs/actions"
import { CurrentTimeDisplay } from "video-react"

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

  currentSubtitle() {
    let text = null
    let playerState = this.props.player
    if (!playerState) {
      return <h4>Loading Player State...</h4>
    }

    if (!this.props.subtitles) {
      return <h4>No matching subtitle</h4>
    } else {
      if (playerState.currentTime == 0) return text

      this.props.subtitles.forEach((sentence) => {
        if (sentence.start_time < playerState.currentTime && sentence.end_time > playerState.currentTime) {
          text = sentence.content
        }
      })
      return <p className="subtitle">{text}</p>
    }
  }

  render() {

    const { video: video } = this.state
    let videoUrl = video.src
    let definitions = this.props.definitions
    let currentSubtitle = this.currentSubtitle()

    return (
      <div className="container">
        <div className="row d-flex align-items-left">
          <Link to="/videos" className="btn btn-link">
            Back to videos
          </Link>
        </div>
        <div className="row d-flex justify-content-center video-player-wrapper">
          <VideoPlayer video_source={videoUrl} />
        </div>
        <div className="row align-items-center justify-content-center">
          {currentSubtitle}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    definitions: state.definitions,
    subtitles: state.subtitles,
    player: state.player
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(Video)
