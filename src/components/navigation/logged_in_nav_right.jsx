import React from 'react'
import { connect } from 'react-redux'
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton';
import ActivePage from '../../enums/active_page'
import * as appActionCreators from '../../action_creators/app_actions'
import * as userActionCreators from '../../action_creators/user_actions'
import * as formActionCreators from '../../action_creators/form_actions'
import { TipContainer } from '../tip'
import { TutorialContainer } from '../tutorial'
import { NDAContainer } from '../nda'


class LoggedInNavRight extends React.Component {
  static muiName = 'IconMenu'

  handleLogout() {
    this.props.setActivePage(ActivePage.HOME)
    this.props.handleLogout()
  }

  handleToggleTutorial = () => {
    this.props.toggleTutorial()
  }

  buildTutorial = () => {
    return (
      <TutorialContainer />
    )
  }

  render() {
    const Tutorial = this.buildTutorial()
    return (
      <ToolbarGroup>
          <FlatButton
            label=" "
            secondary
            icon={
              <i className="material-icons">
                live_help
              </i>
            }
            onTouchTap={this.handleToggleTutorial.bind(this)}
          />
        { Tutorial }
          <FlatButton
            label="Sign Out"
            onTouchTap={this.handleLogout.bind(this)}
            labelStyle={{ color: 'white' }}
          />
      </ToolbarGroup>
    )
  }
}

const actionCreators = Object.assign({}, userActionCreators, appActionCreators, formActionCreators)

export const LoggedInNavRightContainer = connect(
  null,
  actionCreators,
)(LoggedInNavRight)


