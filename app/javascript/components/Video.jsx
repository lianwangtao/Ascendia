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
      video: { src: "", img: "" }
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
    if (!this.props.translator.dictionary) {
      this.props.translator.loadDictionary()
      this.props.updateTranslator(this.props.translator)
    }
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
    let playerState = this.props.player
    if (playerState && this.props.subtitles) {
      this.props.subtitles.forEach((sentence) => {
        if (sentence.start_time < playerState.currentTime && sentence.end_time > playerState.currentTime) {
          this.props.updateCurrentSubtitle(sentence["content"])
        }
      })
    }
  }

  render() {
    const { video: video } = this.state
    const videoUrl = video.src
    this.getCurrentSubtitleText()

    return (
      <div className="video">
        <VideoPlayer className="video-player" video_source={videoUrl} />
        <div className="helper justify-content-center">
          <Subtitle />
          <Definition />
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    subtitles: state.video.subtitles,
    player: state.video.player,
    currentSubtitle: state.video.currentSubtitle,
    translator: state.home.translator
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(Video)
