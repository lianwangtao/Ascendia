import React from "react"
import { connect } from "react-redux"
import ReactPlayer from 'react-player'
import * as videoActions from "../packs/actions"

class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      playing: true,
      controls: true,
      light: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false
    }
    this.handleProgress = this.handleProgress.bind(this)
  }

  handleProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
      if (this.state.playedSeconds != this.props.currentTime) {
        this.props.updatePlayerCurrentTime(this.state.playedSeconds)
      }
    }
  }

  render() {
    const { controls, muted } = this.state
    return (
      <ReactPlayer
        url={this.props.video_source}
        ref={this.ref}
        width='100%'
        height='100%'
        muted={muted}
        controls={controls}
        onProgress={this.handleProgress}
      >
      </ReactPlayer>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTime: state.video.currentTime
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(VideoPlayer)