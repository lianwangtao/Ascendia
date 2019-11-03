import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as videoActions from "../packs/actions"

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      video: { src: "" , img: "" }, 
      subtitles: [],
      defintions: [] 
    }

    this.addHtmlEntities = this.addHtmlEntities.bind(this)
    this.fetchVideo = this.fetchVideo.bind(this)
    //this.fetchSubtitles = this.fetchSubtitles.bind(this)
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

  fetchDefinitionsForSentence() {
    if (this.state.subtitles.length == 0) {
      console.log("Empty")
    }
    this.state.subtitles.forEach((sentence) => {
      console.log(`Fetching defintion for id ${sentence.id}`)
      this.fetchDefinitions(sentence.id)
    })
  }

  fetchDefinitions(subtitle_id) {
    const url = `/api/v1/definitions?subtitle_id=${subtitle_id}`
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => console.log(response.json()) )
      .catch(() => this.props.history.push("/videos"))
  }

  render() {
    const { video: video } = this.state
    let videoUrl = video.src
    let videoImg = video.img
    let subtitles = []
    //let definitions = this.props.definitions
    console.log(subtitles)
    
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
              <h4 className="mb-2">Video url</h4>
                  {videoUrl}
            </div>
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
    definitions: state.video.definitions,
    subtitles: state.video.subtitles
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(Video)
