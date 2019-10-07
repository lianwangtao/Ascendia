import React from 'react'
import { connect } from 'react-redux'
import util from 'util'
import { Button, Panel } from 'react-bootstrap'
import { Card, CardActions, Dialog, TextField, RaisedButton, Snackbar, FlatButton } from 'material-ui'
import * as userActionCreators from '../action_creators/user_actions'
import * as appActionCreators from '../action_creators/app_actions'
import styles from '../assets/app'
import { isValidEmail } from '../utils'
import { PageTitle } from './page_title'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.openForgotPassword = this.openForgotPassword.bind(this)
    this.closeForgotPassword = this.closeForgotPassword.bind(this)
    this.handlePasswordRecoverEmailChange = this.handlePasswordRecoverEmailChange.bind(this)
    this.submitRecover = this.submitRecover.bind(this)

    this.state = {
      email: '',
      password: '',
      autoHideDuration: 4000,
      forgotPassword: false,
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordRecoverEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleRequestClose(e) {
    this.props.closeError()
  }

  closeForgotPassword(e) {
    this.setState({
      forgotPassword: false,
    })
  }

  openForgotPassword(e) {
    this.setState({
      forgotPassword: true,
    })
  }

  handleLogin(e) {
    e.preventDefault()
    if (isValidEmail(this.state.email)) {
      this.props.handleLogin(this.state, this.props.setActivePage)
    }
  }

  submitRecover() {
    if (isValidEmail(this.state.email)) {
      this.props.recoverPassword(this.state.email)
      this.closeForgotPassword
    }
  }

  buildForgotPasswordDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={this.closeForgotPassword}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled={!isValidEmail(this.state.email)}
        onClick={this.submitRecover}
      />,
    ];
    return (
      <Dialog
        title="Please enter your email address to recover your password"
        actions={actions}
        modal
        open={this.state.forgotPassword}
      >
        <p>We will send a recovery link to your email. Please make sure it is the same email adress you signed up with.</p>
        <TextField
          floatingLabelText="Email"
          multiLine={false}
          onChange={this.handlePasswordRecoverEmailChange}
        />
      </Dialog>
    )
  }

  render() {
    const ForgotPassword = this.buildForgotPasswordDialog()
    return (
      <div>
        <PageTitle title="Login" />
        {ForgotPassword}
        <div>
          <form onSubmit={this.handleLogin}>
            <Card zDepth={1} rounded>
              <CardActions className="center-fields login-form">
                <TextField
                  floatingLabelText="Email"
                  multiLine={false}
                  onChange={this.handleEmailChange}
                />
                <TextField
                  floatingLabelText="Password"
                  multiLine={false}
                  onChange={this.handlePasswordChange}
                  type="password"
                />
                <FlatButton
                  label="Forgot password?"
                  primary
                  onClick={this.openForgotPassword}
                />
                <div style={{ marginTop: 10 }}>
                  <RaisedButton
                    label="Submit"
                    type="submit"
                    primary
                    disabled={!this.state.email || !this.state.password}
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

const actionCreators = Object.assign({}, userActionCreators, appActionCreators)

export const LoginContainer = connect(
  mapStateToProps,
  actionCreators,
)(Login)
