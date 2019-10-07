import React from 'react'
import { connect } from 'react-redux'
import { Jumbotron } from 'react-bootstrap'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import * as userActionCreators from '../action_creators/user_actions'
import * as appActionCreators from '../action_creators/app_actions'
import ActivePage from '../enums/active_page'


export class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      marginTop: 20,
    }

    const loggedOutActions = (
      <div style={style}>
        <RaisedButton
          label="Log in"
          primary={true}
          onTouchTap={() => this.props.setActivePage(ActivePage.LOGIN)}
        />
        <div>
          <h5 class = "text-center">
            <a
              href="#"
              onTouchTap={() => this.props.setActivePage(ActivePage.SIGNUP)}
            >
              Don{"'"}t have an account? Sign up here!
            </a>
          </h5>
        </div>
      </div>
    )

    const loggedInActions = (
      <RaisedButton
        label="Get Started"
        primary={true}
        onTouchTap={() =>
          this.props.setActivePage(ActivePage.JOURNAL)
        }
      />
    )

    return (
      <div>
        <div>
          <Paper zDepth={1} rounded={false}>
            <Jumbotron style={{backgroundColor: 'white'}}>
              <h1 class = "text-center">Welcome to Image Categorization Tool</h1>

              {
                this.props.error === null
                  ? loggedInActions
                  : loggedOutActions
              }
            </Jumbotron>
          </Paper>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    error: state.user.error,
  }
}

const actionCreators = Object.assign({}, userActionCreators, appActionCreators)

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home)


