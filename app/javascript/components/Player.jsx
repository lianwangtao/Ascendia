import React from "react"
import { Player, ControlBar, BigPlayButton} from 'video-react'

export default class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    console.log("URL: ", this.props.video_source)
  }

  render() {
    return (
      <Player
        fluid
        src={this.props.video_source}
      >
        <BigPlayButton position="center" />
        <ControlBar autoHide={true} />
      </Player>
    )
  }
}