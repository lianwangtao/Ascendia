import React from "react"
import { connect } from "react-redux"
import * as videoActions from "../packs/actions"

class Definition extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    buildDefinition() {
        let definition = ""

        if (this.props.definition) {
            definition = this.props.definition
        }
        return <p className="definition-text">{definition}</p>
    }

    render() {
        const definition = this.buildDefinition()
        return (
            <div className="definition d-flex justify-content-center">
                {definition}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        definition: state.video.definition,
    }
}

export default connect(
    mapStateToProps,
    videoActions
)(Definition)
