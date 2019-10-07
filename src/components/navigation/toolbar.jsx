import React from 'react'
import { connect } from 'react-redux'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import * as appActionCreators from '../../action_creators/app_actions'
import ActivePage from '../../enums/active_page'
import { LoggedOutNavRightContainer } from './logged_out_nav_right'
import { LoggedInNavRightContainer } from './logged_in_nav_right'

class Navbar extends React.Component {
  render() {
    const toolbarStyle = {
      marginBottom: 20,
      color: 'white',
    }

    const toolbarTitleStyle = {
      cursor: 'pointer',
    }

    return (
      <Toolbar style={toolbarStyle}>
        <ToolbarTitle
          text="Image Categorization Tool"
          style={toolbarTitleStyle}
          onTouchTap={() => {
            this.props.setActivePage(ActivePage.HOME)
          }}
        />
        {
          this.props.error === null
            ? <LoggedInNavRightContainer />
            : <LoggedOutNavRightContainer />
        }
      </Toolbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    error: state.user.error,
  }
}

export const ToolbarContainer = connect(
  mapStateToProps,
  appActionCreators,
)(Navbar)
