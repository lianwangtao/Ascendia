import React from "react"
import { connect } from "react-redux"
import { Player, ControlBar, BigPlayButton } from 'video-react'
import * as videoActions from "../packs/actions"

class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this))
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    // this.setState({
    //   player: state,
    //   currentTime: state.currentTime
    // })
    if (state.currentTime != prevState.currentTime) {
      this.props.updatePlayerCurrentTime(state.currentTime)
    }
  }

  render() {
    return (
      <Player
        playsInline
        muted
        src={this.props.video_source}
        ref={player => {
          this.player = player;
        }}
      >
        <BigPlayButton position="center" />
        <ControlBar className="player-control-bar" />
      </Player>
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