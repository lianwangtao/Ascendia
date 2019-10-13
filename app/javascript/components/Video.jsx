import React from "react"
import { Link } from "react-router-dom"

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = { video: { src: "" } }

    this.addHtmlEntities = this.addHtmlEntities.bind(this)
    this.deleteVideo = this.deleteVideo.bind(this)
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

    const url = `/api/v1/show/${id}`
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

  deleteVideo() {
    const {
      match: {
        params: { id }
      }
    } = this.props

    const url = `/api/v1/destroy/${id}`
    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(() => this.props.history.push("/videos"))
      .catch(error => console.log(error.message))
  }

  render() {
    const { video: video } = this.state
    let videoUrl = video.src

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {video.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Video url</h5>
                    {videoUrl}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteVideo}
              >
                Delete Video
              </button>
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
