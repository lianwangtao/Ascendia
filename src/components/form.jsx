import {
  Button,
  Card,
  CardActions,
  CardText,
  CardMedia,
  FlatButton,
  TextField,
  SelectField,
  MenuItem,
  IconButton,
  RaisedButton,
  Paper,
  Snackbar,
} from 'material-ui'
import React from 'react'
import { connect } from 'react-redux'
import * as formActionCreators from '../action_creators/form_actions'
import * as userActionCreators from '../action_creators/user_actions'
import { TipContainer } from './tip'
import { TutorialContainer } from './tutorial'
import { NDAContainer } from './nda'
import moment from 'moment'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleNextImage = this.handleNextImage.bind(this)
    this.handleSkipImage = this.handleSkipImage.bind(this)
    this.state = {
      category: -1,
      description: '',
      autoHideDuration: 4000,
      message: 'Successfully submitted your response.',
      open: false,
    }
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.setState({
      responseStart: Date.now(),
    })
  }

  handleToggleTutorial = () => {
    this.props.toggleTutorial()
  }
  
  handleSkipImage() {
    this.props.fetchImage(this.props.user.id, parseInt(this.props.imageId) + 1)
  }

  handleNextImage() {
    if (this.state.category !== -1) {
      const currentTime = Date.now()
      const data = {
        imageId: this.props.imageId,
        categoryId: this.state.category,
        description: this.state.description,
        responseTime: (currentTime - this.state.responseStart) / 1000,
      }
      console.log('Submitting with data:', data)
      this.props.handleSubmit(data)
      this.setState({
        open: true,
        category: '',
        errorText: '',
      }, () => {
        this.props.fetchImage(this.props.user.id, this.props.imageId + 1)
      })
    } else {
      this.setState({
        errorText: 'Category is required.',
      })
    }
  }

  handleDescription(event) {
    event.preventDefault()
    this.setState({
      description: event.target.value,
    })
  }

  handleSelectChange = (event, index, value) => {
    this.setState({
      category: value,
      errorText: '',
    })
    this.props.setCurrentCategory(value)
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  buildCategories() {
    const menuItems = []
    if (this.props.categories) {
      for (const category of this.props.categories) {
        menuItems.push(
          <MenuItem
            key={category.id}
            value={category.id}
            primaryText={category.value}
            style={{ width: 300 }}
          />,
        )
      }
    }
    return menuItems
  }

  buildTextField() {
    if (this.state.category === 8) {
      return (
        <TextField
          fullWidth
          multiLine
          onChange={this.handleDescription}
          floatingLabelText="Description"
          hintText="Please specify the category"
        />
      )
    }
    return ''
  }

  buildCategoryTip = () => {
    return (
      <TipContainer />
    )
  }

  buildSelection = () => {
    const categories = this.buildCategories()
    const categoryTip = this.buildCategoryTip()
    const textField = this.buildTextField()
    // this.props.fetchResponseForImage(this.props.user.id, this.props.imageId)

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '2 3 0', paddingTop: 6 }}>
          <h4>
            Please select a category:
          </h4>
          <SelectField
            floatingLabelText="Category"
            value={this.state.category}
            onChange={this.handleSelectChange}
            style={{
              width: 490,
              marginRight: 10,
            }}
            maxHeight={500}
            errorText={this.state.errorText}
          >
            {categories}
          </SelectField>
          <div style={{ marginRight: 10 }}>
            {textField}
          </div>
        </div>
        {categoryTip}
      </div>
    )
  }

  buildTutorial() {
    if (this.props.user && this.props.user.activated && this.props.user.nda
      && this.props.user.firstTimeLogin) {
      return <TutorialContainer />
    } else if (!this.props.user.firstTimeLogin && this.props.user && this.props.form.tutorial) {
      return <TutorialContainer />
    }
    return null
  }

  buildForm() {
    const selection = this.buildSelection()
    const cardStyle = {
      width: 500,
      height: 580,
    }
    return (
      <Card style={cardStyle}>
        <CardText>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          />
          {selection}
        </CardText>
        <CardActions>
            <div
            style={{
              display: 'flex',
              alignSelf: 'flex-end',
            }}
          />
          <RaisedButton
            secondary
            onTouchTap={this.handleSkipImage}
            style={{ float: 'bottom', }}
            label="Skip Image"
          />
          <RaisedButton
            primary
            onTouchTap={this.handleNextImage}
            style={{ float: 'right', }}
            disabled={this.state.category === -1}
            label="Save and Continue"
          />
        </CardActions>
      </Card>
    )
  }

  buildConfirmation() {
    return (
      <div>
        <Card className='form-card'>
          <CardText style={{ textAlign: 'center' }}>
            <h2 style={{ textAlign: 'center' }}>Welcome!</h2>
            <h3
              style={{
                marginTop: 50,
              }}
            >
              We have recieved your application. We'll let you know when your account gets approved.
            </h3>
            <h5
              style={{
                marginTop: 15,
                marginBottom: 50,
              }}
            >
              Didn't recieve email? Check your spam folder or contact us for more information.
              </h5>
          </CardText>
          <CardActions>
            <RaisedButton
              href="mailto:aviatr@waisman.wisc.edu?Subject=image-cat-web-app question"
              icon={
                <i
                  className="material-icons email-icon"
                  style={{
                    color: 'white',
                  }}
                >
                  email
                  </i>
              }
              id="open_email"
              label="Send email"
              primary
              type="send_email"
            />
          </CardActions>
        </Card>
      </div>
    )
  }

  buildNDA() {
    return <NDAContainer />
  }

  buildImage() {
    if (this.props.user && !this.props.imageUrl) {
      this.props.fetchImage(this.props.user.id, this.props.user.lastAccessImageId)
    }
    const cardStyle = {
      width: 520,
      height: 580,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    }
    return (
      <Card style={cardStyle}>
      <CardMedia>
      <img
        src={this.props.imageUrl}
        class = "contain"
        style={{
          maxWidth: 500,
          maxHeight: 500,
          display: 'flex',
          justifyContent: 'center',
        }}
        alt = "Image to categorize"
      />
      </CardMedia>
      </Card >
    )
  }

  buildMainContent() {
    const ndaForm = this.buildNDA()
    const confirmation = this.buildConfirmation()
    const form = this.buildForm()
    const image = this.buildImage()
    if (this.props.user && !this.props.user.nda && !this.props.user.activated) {
      return ndaForm
    }
    if (this.props.user && this.props.user.activated) {
      const Tutorial = this.buildTutorial()
      return (
         <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {image}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {form}
            <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={this.state.autoHideDuration}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </div>
      )
    }
    return confirmation
  }

  render() {
    const mainContent = this.buildMainContent()

    return (
      <div>
        { mainContent }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  categories: state.form.categories,
  imageUrl: state.form.imageUrl,
  form: state.form,
  imageId: state.form.imageId,
})

const actionCreators = Object.assign({}, userActionCreators, formActionCreators)

export const FormContainer = connect(
  mapStateToProps,
  actionCreators,
)(Form)
