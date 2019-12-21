import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import VideoPlayer from "./Player"
import Subtitle from "./Subtitle"
import Definition from "./Definition"
import * as videoActions from "../packs/actions"

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video: { src: "", img: "" },
      selection: "",
      definition: ""
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

  getCurrentSubtitleText() {
    let text = null
    let playerState = this.props.player
    if (!playerState) {
      return text
    }

    if (!this.props.subtitles) {
      return text
    } else {
      if (playerState.currentTime == 0) return text

      this.props.subtitles.forEach((sentence) => {
        if (sentence.start_time < playerState.currentTime && sentence.end_time > playerState.currentTime) {
          text = sentence.content
        }
      })
      return text
    }
  }

  render() {
    const { video: video } = this.state
    const videoUrl = video.src
    const subtitleText = this.getCurrentSubtitleText()

    return (
      <div className="video">
        <VideoPlayer className="video-player" video_source={videoUrl} />
        <div className="helper justify-content-center">
          <Subtitle text={subtitleText} />
          <Definition />
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    subtitles: state.subtitles,
    player: state.player
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(Video)
