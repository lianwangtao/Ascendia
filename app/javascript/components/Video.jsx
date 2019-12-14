import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import hanzi from "hanzi"
import VideoPlayer from "./Player"
import * as videoActions from "../packs/actions"

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video: { src: "", img: "" },
      selection: "",
      definition: "",
      hanzi,
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
    this.state.hanzi.start()
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

  segmentSubtitle(sentence) {
    let segmented = []
    if (sentence) {
      segmented = hanzi.segment(sentence)
    }
    return segmented
  }

  currentDefinition() {
    let definition = ""

    if (this.state.definition) {
      definition = this.state.definition
    }
    return <h3>{definition}</h3>
  }

  currentSubtitle(subtitleText, segmentedSubtitles) {
    if (segmentedSubtitles.length == 0) {
      return <h3>{subtitleText}</h3>
    }

    const highlightedWords = []
    segmentedSubtitles.forEach((word) => {
      highlightedWords.push((
        <h3 className="word" key={word}>{word}</h3>
      ))
    })

    return highlightedWords
  }

  fetchDefinition = () => {
    const selected = window.getSelection() ? window.getSelection().toString() : ""
    this.setState({ selection: selected })
    const result = hanzi.definitionLookup(selected, 's')

    if (result) this.setState({ definition: result[0]["definition"] })
    else this.setState({ definition: null })
  }

  render() {
    const { video: video } = this.state
    const videoUrl = video.src
    const subtitleText = this.getCurrentSubtitleText()
    const segmentedSubtitles = this.segmentSubtitle(subtitleText)
    const currentSubtitle = this.currentSubtitle(subtitleText, segmentedSubtitles)
    const currentDefinition = this.currentDefinition()

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
        <div className="row align-items-center justify-content-center" onMouseUp={this.fetchDefinition}>
          {currentSubtitle}
        </div>
        <div className="row align-items-center justify-content-center">
          {currentDefinition}
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
