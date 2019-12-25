import React from "react"
import { connect } from "react-redux"
import { withStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import VideoPlayer from "./Player"
import Subtitle from "./Subtitle"
import Definition from "./Definition"
import * as videoActions from "../packs/actions"

const styles = {
  root: {
    color: 'white',
  },
}

const BackButton = withStyles(styles)(Button)

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video: { src: "", img: "" }
    }

    this.addHtmlEntities = this.addHtmlEntities.bind(this)
    this.fetchVideo = this.fetchVideo.bind(this)
    this.getcurrentSubtitlesText = this.getcurrentSubtitlesText.bind(this)
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

  componentDidUpdate() {
    this.getcurrentSubtitlesText()
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

  getcurrentSubtitlesText() {
    let currentTime = this.props.currentTime
    if (currentTime && this.props.subtitles) {
      const matchedSubtitles = []
      this.props.subtitles.forEach((sentence) => {
        if (sentence.start_time < currentTime && sentence.end_time > currentTime && !this.props.currentSubtitles.includes(sentence)) {
          matchedSubtitles.push(sentence)
          this.props.updatecurrentSubtitles(matchedSubtitles)
        }
      })
    }
  }

  render() {
    const { video: video } = this.state
    const videoUrl = video.src

    return (
      <div className="video">
        <div className="video-top-nav">
          <BackButton
            className="btn btn-dark"
            disableFocusRipple
            startIcon={<ArrowBackIosIcon className="back-button" />}
            component={Link}
            to={"/videos"}
          >
            Back
          </BackButton>
        </div>
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
    currentTime: state.video.currentTime,
    currentSubtitles: state.video.currentSubtitles,
    translator: state.home.translator
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(Video)
