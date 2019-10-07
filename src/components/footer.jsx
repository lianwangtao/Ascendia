import { connect } from 'react-redux'
import { RaisedButton } from 'material-ui'
import React from 'react'
import * as appActionCreators from '../action_creators/app_actions'
import ActivePage from '../enums/active_page'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sharedStyle = {
     textAlign: 'center',
     position: 'relative',
     padding: 20,
     color: '#7f7b7b',
   }

    return (
      <div style={sharedStyle}>
        <RaisedButton
          id="contact-us"
          label="Contact Us"
          secondary
          onTouchTap={() => this.props.setActivePage(ActivePage.CONTACT)}
        />
        <div style={{ margin: 5 }}>
          <p>&copy;2017-2018 A Visual Impairment and Accessibility Technology Research Lab
            (
              <a
                href="https://aviatr.waisman.wisc.edu/"
                target="_blank"
              >
                AVIATR
              </a>
            )
          </p>
          <p>UW-Madison Waisman Center</p>
        </div>
      </div>
    )
  }
}

export const FooterContainer = connect(
  null,
  appActionCreators,
)(Footer)
