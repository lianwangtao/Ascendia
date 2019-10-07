import 'babel-polyfill' // Allows for Promises
import React from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  blue500,
  grey100,
  grey300,
  pink500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Grid, Button } from 'react-bootstrap'
import ActivePage from '../enums/active_page'
import { FooterContainer } from './footer'
import { FormContainer } from './form'
import { HomeContainer } from './home'
import { LoginContainer } from './login'
import { ToolbarContainer } from './navigation/toolbar'
import { SignupContainer } from './signup'
import { About } from './about'
import { Contact } from './contact'
import util from 'util'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    accent1Color: pink500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    shadowColor: fullBlack,
  },
  toolbar: {
    backgroundColor: '#283593',
  },
  raisedButton: {
    primaryColor: blue500,
    secondaryColor: pink500,
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let body
    if (this.props.activePage === ActivePage.ABOUT) {
      body = <About />
    } else if (this.props.activePage === ActivePage.CONTACT) {
      body = <Contact />
    } else if (this.props.activePage === ActivePage.HOME) {
      body = <HomeContainer />
    } else if (this.props.activePage === ActivePage.JOURNAL) {
      body = <FormContainer />
    } else if (this.props.activePage === ActivePage.LOGIN) {
      body = <LoginContainer />
    } else if (this.props.activePage === ActivePage.SIGNUP) {
      body = <SignupContainer />
    } else {
      console.log('Unhandled tab in app!')
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ToolbarContainer />
          <Grid
            className="grid"
          >
            {body}
          </Grid>
          <div>
            <FooterContainer />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activePage: state.app.activePage,
  }
}

export const AppContainer = connect(
  mapStateToProps,
  null,
)(App)
