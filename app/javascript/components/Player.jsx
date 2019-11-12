import React from "react"
import { Player, ControlBar, BigPlayButton} from 'video-react'

export default class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Player
        fluid
        src={this.props.video_source}
      >
        <BigPlayButton position="center" />
        <ControlBar autoHide={true} className="player-control-bar" />
      </Player>
    )
  }
}
