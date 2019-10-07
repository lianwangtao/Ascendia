import React from 'react'
import { connect } from 'react-redux'
import util from 'util'
import { Button, Panel } from 'react-bootstrap'
import { Card, CardTitle, CardText, CardHeader, CardActions, TextField, FlatButton, RaisedButton, Snackbar } from 'material-ui'
import * as userActionCreators from '../action_creators/user_actions'
import * as formActionCreators from '../action_creators/form_actions'
import * as appActionCreators from '../action_creators/app_actions'
import styles from '../assets/app'
import { PageTitle } from './page_title'
import { isValidEmail } from '../utils'
import ActivePage from '../enums/active_page'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      pwConfirmError: '',
      autoHideDuration: 4000,
    }
  }

  handleRequestClose(e) {
    this.props.closeError()
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value })
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handlePasswordConfirmChange(e) {
    this.setState({ passwordConfirm: e.target.value })
    if (this.state.password !== e.target.value) {
      this.setState({ pwConfirmError: 'Password do not match' })
    } else {
      this.setState({ pwConfirmError: null })
    }
  }

  handleSignup(e) {
    e.preventDefault()
    if (isValidEmail(this.state.email)) {
      this.props.handleSignup(this.state, this.props.setActivePage)
    }
  }

  render() {
    return (
      <div>
        <PageTitle title="Sign Up" />
        <div>
          <form onSubmit={this.handleSignup}>
            <Card zDepth={1} rounded={false}>
              <CardActions className="center-fields login-form">
                <div>
                  <TextField
                    floatingLabelText="First name"
                    multiLine={false}
                    onChange={this.handleFirstNameChange} />
                </div>

                <div>
                  <TextField
                    floatingLabelText="Last name"
                    multiLine={false}
                    onChange={this.handleLastNameChange} />
                </div>

                <div>
                  <TextField
                    floatingLabelText="Email"
                    multiLine={false}
                    onChange={this.handleEmailChange}
                  />
                </div>

                <div>
                  <TextField
                    floatingLabelText="Password"
                    multiLine={false}
                    onChange={this.handlePasswordChange}
                    type="password"
                  />
                </div>

                <div>
                  <TextField
                    floatingLabelText="Password Confirmation"
                    multiLine={false}
                    errorText={this.state.pwConfirmError}
                    onChange={this.handlePasswordConfirmChange}
                    type="password"
                  />
                </div>

                <div style={{ marginTop: 10 }}>
                  <RaisedButton
                    label="Submit"
                    type="submit"
                    primary
                    disabled={this.state.pwConfirmError !== null}
                  />
                </div>
              </CardActions>
            </Card>
          </form>
        </div>
        <Snackbar
          open={this.props.error.open}
          message={this.props.error.message}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleRequestClose}
        />
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

const actionCreators = Object.assign({}, userActionCreators, appActionCreators, formActionCreators)

export const SignupContainer = connect(
  mapStateToProps,
  actionCreators,
)(Signup)
