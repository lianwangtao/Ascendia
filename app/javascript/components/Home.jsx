import React from "react"
import CircularProgress from '@material-ui/core/CircularProgress'
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Translator from "../packs/translationService"
import * as actions from "../packs/actions"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      translator: new Translator()
    }
  }

  componentDidMount() {
    this.state.translator.loadDictionary()
    this.props.updateTranslator(this.state.translator)
    setTimeout(() => {
      this.props.updateHomeLoading(false)
    }, 1500)
  }

  render() {
    if (!this.props.loading) {
      return <Redirect to='/videos' />
    }
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <div className="row d-flex flex-column align-items-center justify-content-center ">
              <h1 className="display-4">Ascendia</h1>
              <p className="lead">
                A better way to learn languages.
              </p>
            </div>
            <hr className="my-4" />
            <div className="row d-flex justify-content-center">
              <CircularProgress />
              <h3 style={{ marginLeft: '10px' }}>
                Loading...
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.home.loading,
  }
}

export default connect(
  mapStateToProps,
  actions
)(Home)
