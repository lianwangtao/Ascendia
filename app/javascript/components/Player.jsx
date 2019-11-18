import React from "react"
import { connect } from "react-redux"
import { Player, ControlBar, BigPlayButton} from 'video-react'
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
    this.setState({
      player: state,
      currentTime: state.currentTime
    })
    this.props.updatePlayerState(state)
  }

  render() {
    return (
      <Player
        fluid
        src={this.props.video_source}
        ref={player => {
          this.player = player;
        }}
      >
        <BigPlayButton position="center" />
        <ControlBar autoHide={true} className="player-control-bar" />
      </Player>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.player
  }
}

export default connect(
  mapStateToProps,
  videoActions
)(VideoPlayer)