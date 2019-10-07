import React from 'react'
import {
  Dialog,
  FlatButton,
  RaisedButton,
  Step,
  Stepper,
  StepLabel,
} from 'material-ui'
import { Row, Col } from 'react-bootstrap'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentSend from 'material-ui/svg-icons/content/send'
import { connect } from 'react-redux'
import * as formActionCreators from '../action_creators/form_actions'
import * as userActionCreators from '../action_creators/user_actions'

export class Tutorial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state
    if (stepIndex >= 2) {
      this.handleClose()
    } else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
        open: stepIndex < 2,
      })
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  buildCategoryContent() {
    const titleStyle = {
      color: 'black',
    }
    const desStyle = {
      color: '#A7A7A7',
    }
    return (
      <div
        style={{
          height: '100%',
        }}
      >
      <h3>Here are all the categories:</h3>
        <Row>
          <Col md={6}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0f/N-Acetylglutamate_Synthase_Chemical_Equation.png"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Chemical Formula
            <p style={desStyle}>
            A set of chemical symbols showing the elements present in a compound and their relative proportions, and in some cases the structure of the compound.
            </p>
          </Col>
        </Row>
        <Row>
          <Col style={titleStyle} md={6}>
            <img
              src="https://wikimedia.org/api/rest_v1/media/math/render/svg/7be821daafcefcac94761c17251ec96c9225a074"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Math Equations and Formulas
            <p style={desStyle}>
              A group of mathematical symbols that express a relationship or that are used to solve a problem. These usually consist of a set of mathematical symbols and their relationships and can consist of multiple lines showing multiple constraints or how an equation or inequality is solved.
            </p>
          </Col>
        </Row>
        <Row>
          <Col style={titleStyle} md={6}>
            <img
              src="https://ucarecdn.com/42d286d9-1a02-484e-97df-93431b10c25c/"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Diagrams/Charts
            <p style={desStyle}>
            A symbolic representation of information according to some visualization technique.  E.g.: Chart, Graph and Schematics.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            md={6}
          >
            <img
              src="http://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/tv-show-map2_0.png"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Map
            <p style={desStyle}>
            A map is a visual representation of an entire area or a part of an area, typically represented on a flat surface. It can also be a diagrammatic representation of an area of land or sea showing physical features, cities, roads, etc.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <img
              src="https://rlv.zcache.com/wordart_postcard-rfb088bfab47744e9ab2b52ac00814430_vgbaq_8byvr_324.jpg"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Word Art
            <p style={desStyle}>
            Stylized text with various "special effects" such as textures, outlines, and many other manipulations that are not available through the standard font formatting. For example, shadows, rotate, "bend", and "stretch" the shape of the text.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            md={6}
            style={{
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/A_Stream_of_Stars_over_Paranal.jpg/220px-A_Stream_of_Stars_over_Paranal.jpg"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Photograph
            <p style={desStyle}>
            A picture made using a camera, which captures light falling on a light-sensitive surface. If the photograph includes annotations to describe different parts of an object, for example, please instead choose the “Diagrams/Charts” category.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Chen_Hongshou%2C_leaf_album_painting.jpg/220px-Chen_Hongshou%2C_leaf_album_painting.jpg"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Drawings/Paintings
            <p style={desStyle}>
            An artwork created using either conventional pigment-based paint on a surface such as a canvas, or created digitally. If a drawing includes annotations to describe different parts of an object, for example, please instead choose the “Diagrams/Charts” category.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            md={6}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Table-sample-appearance-default-params-values-01.gif/300px-Table-sample-appearance-default-params-values-01.gif"
              alt=""
              style={{ padding: 20 }}
              width="70%"
            />
          </Col>
          <Col style={titleStyle} md={6}>
            Table
            <p style={desStyle}>
            An arrangement of data in rows and columns, or possibly in a more complex structure.
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  getStepContent(stepIndex) {
    const intro = (
      <div>
        <h4>
          Welcome to Image Categorization Tool!
        </h4>
        <p>
          We{"'"}ll walk you through all the categories as well as how to use this tool.
        </p>
        <p>
          You will be asked to label images belonging to various categories, such as photographs, charts and equations. Please label each image as belonging to the category you deem most fitting. If none of the categories apply, please choose 'other' and provide a brief guess as to its label.
        </p>
        <p>
          If you need more assisstance, check out the top section next to the selection. You can also use the top Show Tutorial button to bring this back.
        </p>
      </div>
    )

    const usage = this.buildCategoryContent()

    const final = (
      <div>
        <p style={{ marginBottom: 25 }}>
          You're all done!
        </p>
        <p>
          Now get started on your first label!
        </p>
      </div>
    )

    switch (stepIndex) {
      case 0:
        return intro
      case 1:
        return usage
      case 2:
        return final
    }
  }

  handleClose = () => {
    this.setState({ stepIndex: 0, finished: false }, () => {
      this.props.toggleTutorial()
    })
    this.props.confirmFirstTimeLogin(this.props.user.id)
  }

  buildStepper(stepIndex) {
    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Welcome to Image Categorization</StepLabel>
          </Step>
          <Step>
            <StepLabel>Categories</StepLabel>
          </Step>
          <Step>
            <StepLabel>Get started</StepLabel>
          </Step>
        </Stepper>
        <div style={{ margin: '0 16px' }}>
          <div>{this.getStepContent(stepIndex)}</div>
          <div style={{ marginTop: 20 }}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onTouchTap={this.handlePrev}
              style={{ marginRight: 12 }}
            />
            <RaisedButton
              style={{ float: 'right' }}
              label={stepIndex === 2 ? 'Finish' : 'Next'}
              primary
              onTouchTap={this.handleNext}
            />
          </div>
        </div>
        </div>
      )
    }

  render() {
    const StepperContent = this.buildStepper(this.state.stepIndex)

    return (
      <div>
        <Dialog
          modal
          open={this.props.form.tutorial}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {StepperContent}
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  form: state.form,
  user: state.user,
})

const creators = Object.assign({}, formActionCreators, userActionCreators)

export const TutorialContainer = connect(
  mapStateToProps,
  creators,
)(Tutorial)
