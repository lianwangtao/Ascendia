import React from "react"
import hanzi from "hanzi"
import { connect } from "react-redux"
import * as videoActions from "../packs/actions"

class Subtitle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        hanzi.start()
    }

    segmentSubtitle(sentence) {
        let segmented = []
        if (sentence) {
            segmented = hanzi.segment(sentence)
        }
        return segmented
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
        const segmentedSubtitles = this.segmentSubtitle(this.props.text)
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
    }
}

export default connect(
    mapStateToProps,
    videoActions
)(Subtitle)

