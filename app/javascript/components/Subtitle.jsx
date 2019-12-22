import React from "react"
import hanzi from "hanzi"
import { connect } from "react-redux"
import * as actions from "../packs/actions"

class Subtitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    hanzi.start()
  }

  buildSubtitle(subtitleText, segmentedSubtitles) {
    if (segmentedSubtitles && segmentedSubtitles.length == 0) {
      return <h3>{subtitleText}</h3>
    }

    const highlightedWords = []
    let keyIndex = 0
    segmentedSubtitles.forEach((word) => {
      highlightedWords.push((
        <p
          className="word"
          key={keyIndex}
          onMouseEnter={() => this.props.fetchDefinition(word)}>
          {word}
        </p>
      ))
      keyIndex++
    })

    return highlightedWords
  }

  render() {
    const segmentedSubtitles = this.props.translator.segmentSubtitle(this.props.text)
    const subtitle = this.buildSubtitle(this.props.text, segmentedSubtitles)
    return (
      <div className="subtitle d-flex justify-content-center">
        {subtitle}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    definition: state.definition,
    translator: state.home.translator
  }
}

export default connect(
  mapStateToProps,
  actions
)(Subtitle)

