import React from "react"
import hanzi from "hanzi"
import { connect } from "react-redux"
import * as actions from "../packs/actions"
import { segment } from "hanzi/lib/module"

class Subtitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  buildSubtitle() {
    const allSubtitles = [] // All sentences in the current subtitle

    if (!this.props.currentSubtitles) return allSubtitles

    this.props.currentSubtitles.forEach((sentence) => {
      const segmentedSentence = this.props.translator.segmentSubtitle(sentence["content"])
      const segmentedSentenceView = []
      segmentedSentence.map((word, index) => {
        // To push each word into a sentence view
        segmentedSentenceView.push(
          <p
            className="word"
            key={index}
            onMouseOver={() => this.props.fetchDefinition(word, this.props.translator)}
          >
            {word}
          </p>
        )
      })
      // Push each sentence into its own div
      allSubtitles.push(
        <div className="subtitle d-flex justify-content-center">
          {segmentedSentenceView}
        </div>
      )
    })

    return allSubtitles
  }

  render() {
    const allSubtitle = this.buildSubtitle()
    return (
      <div className="">
        {allSubtitle}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentSubtitles: state.video.currentSubtitles,
    translator: state.home.translator
  }
}

export default connect(
  mapStateToProps,
  actions
)(Subtitle)

