import {
  Tabs,
  Tab,
} from 'material-ui'
import * as userActionCreators from '../action_creators/user_actions'
import * as appActionCreators from '../action_creators/app_actions'

export class SubNav extends React.Component {
  constructor(props) {
    super(props)
  }

  handleTabChange = (tabName) => {
    console.log("tabName:", tabName)
    // switch (tabName) {
    //   case 'HOME':
    //     this.props.setActivePage(ActivePage.HOME)
    //     break;
    //   case 'JOURNAL':
    //     this.props.setActivePage(ActivePage.JOURNAL)
    //     break;
    //   case 'TRENDS':
    //     this.props.setActivePage(ActivePage.TRENDS)
    //     break;
    //   case 'HISTORY':
    //     this.props.setActivePage(ActivePage.HISTORY)
    //     break;
    //   default:
    //     this.props.setActivePage(this.props.activePage)
    // }
    // this.setState({selectedTabValue: tabName})
  }

  render() {
    return(
      <Tabs
        value={this.state.activePage}
        inkBarStyle={{backgroundColor: lightgreen500, height: 3}}
        onChange={this.handleTabChange}
        >
        <Tab value='HOME' label='home' />
        <Tab
          disabled={!this.props.user}
          label='Journal'
          value='JOURNAL'
          />
        <Tab
          disabled={!this.props.user}
          label='Trends'
          value='TRENDS'
          />
        <Tab
          disabled={!this.props.user}
          label='History'
          value='HISTORY'
          />
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activePage: state.app.activePage,
    user: state.user,
  }
}

const actionCreators = Object.assign({}, userActionCreators, appActionCreators)

export const AppContainer = connect(
  mapStateToProps,
  actionCreators,
)(App)
