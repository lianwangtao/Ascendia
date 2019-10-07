import React from 'react'
import { connect } from 'react-redux'
import { ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import ActivePage from '../../enums/active_page'
import * as appActionCreators from '../../action_creators/app_actions'

class LoggedOutNavRight extends React.Component {
  static muiName = 'FlatButton'

  render() {
    return (
      <ToolbarGroup>
        <FlatButton
          label="Sign Up"
          labelStyle={{ color: 'white' }}
          onTouchTap={() => {
            this.props.setActivePage(ActivePage.SIGNUP)
          }}
        />
        <FlatButton
          label="Log In"
          labelStyle={{ color: 'white' }}
          onTouchTap={() => {
            this.props.setActivePage(ActivePage.LOGIN)
          }}
        />
      </ToolbarGroup>
    )
  }
}

export const LoggedOutNavRightContainer = connect(
  null,
  appActionCreators,
)(LoggedOutNavRight)
