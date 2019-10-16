import React from "react"
import { Link } from "react-router-dom"

class Videos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
  }

  componentDidMount() {
    const url = "/api/v1/videos/index"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => this.setState({ videos: response }))
      .catch(() => this.props.history.push("/"))
  }

  render() {
    const { videos } = this.state

    const allvideos = videos.map((video, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={video.img}
            className="card-img-top"
            alt={`${video.img} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{video.name}</h5>
            <Link to={`/video/${video.id}`} className="btn custom-button">
              View Video
            </Link>
          </div>
        </div>
      </div>
    ))

    const noVideo = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No videos yet. Why not <Link to="/new_video">create one</Link>
        </h4>
      </div>
    )

    return (
      <div>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">videos for every occasion</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular videos, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
          </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">
              {videos.length > 0 ? allvideos : noVideo}
            </div>
            <Link to="/" className="btn btn-link">
              Home
          </Link>
          </main>
        </div>
      </div>
    )
  }
}

export default Videos
