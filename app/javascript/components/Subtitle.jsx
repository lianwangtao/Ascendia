import React from "react"
import hanzi from "hanzi"
import { connect } from "react-redux"
import * as actions from "../packs/actions"

class Subtitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  buildSubtitle(subtitleText, segmentedSubtitles) {
    if (!segmentedSubtitles && segmentedSubtitles.length == 0) {
      return <h3>{subtitleText}</h3>
    }

    const highlightedWords = []
    let keyIndex = 0
    segmentedSubtitles.forEach((word) => {
      highlightedWords.push((
        <p
          className="word"
          key={keyIndex}
          onMouseEnter={() => this.props.fetchDefinition(word, this.props.translator)}>
          {word}
        </p>
      ))
      keyIndex++
    })

    return highlightedWords
  }

  render() {
    const segmentedSubtitles = this.props.translator.segmentSubtitle(this.props.currentSubtitle)
    const subtitle = this.buildSubtitle(this.props.currentSubtitle, segmentedSubtitles)
    return (
      <div className="subtitle d-flex justify-content-center">
        {subtitle}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentSubtitle: state.video.currentSubtitle,
    translator: state.home.translator
  }
}

export default connect(
  mapStateToProps,
  actions
)(Subtitle)

