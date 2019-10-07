import { connect } from 'react-redux'
import React from 'react'
import {
  Card,
  CardTitle,
  CardText,
  CardMedia,
  CardHeader,
} from 'material-ui'
import * as formActionCreators from '../action_creators/form_actions'
import ActivePage from '../enums/active_page'
import CATEGORIES from '../enums/categories'

class Tip extends React.Component {
  constructor(props) {
    super(props)
  }

  buildTipText = () => {
    if (this.props.currentCategory === undefined) {
      return ['Choose a category that matches the picture above']
    }
    if (this.props.currentCategory === CATEGORIES.ChemicalFormulas) {
      const result = []
      result.push('A set of chemical symbols showing the elements present in a compound and their relative proportions, and in some cases the structure of the compound.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.MathEquations) {
      const result = []
      result.push('A group of mathematical symbols that express a relationship or that are used to solve a problem. These usually consist of a set of mathematical symbols and their relationships and can consist of multiple lines showing multiple constraints or how an equation or inequality is solved.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.DiagramsCharts) {
      const result = []
      result.push('A symbolic representation of information according to some visualization technique.  E.g.: Chart, Graph and Schematics.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.Maps) {
      const result = []
      result.push('A map is a visual representation of an entire area or a part of an area, typically represented on a flat surface. It can also be a diagrammatic representation of an area of land or sea showing physical features, cities, roads, etc.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.WordArt) {
      const result = []
      result.push('Stylized text with various "special effects" such as textures, outlines, and many other manipulations that are not available through the standard font formatting. For example, shadows, rotate, "bend", and "stretch" the shape of the text.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.Photos) {
      const result = []
      result.push('A picture made using a camera, which captures light falling on a light-sensitive surface. If the photograph includes annotations to describe different parts of an object, for example, please instead choose the “Diagrams/Charts” category.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.DrawingsPaintings) {
      const result = []
      result.push('An artwork created using either conventional pigment-based paint on a surface such as a canvas, or created digitally. If a drawing includes annotations to describe different parts of an object, for example, please instead choose the “Diagrams/Charts” category.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.Tables) {
      const result = []
      result.push('An arrangement of data in rows and columns, or possibly in a more complex structure.')
      return result;
    }
    if (this.props.currentCategory === CATEGORIES.Others) {
      const result = []
      result.push('If an image does not fit into any of those above categories, choose this category. If not sure, please choose the category that looks the most appropriate.')
      return result;
    }
  }

  getExampleUrl = () => {
    if (this.props.currentCategory === 0) {
      return 'https://upload.wikimedia.org/wikipedia/commons/0/0f/N-Acetylglutamate_Synthase_Chemical_Equation.png'
    }
    if (this.props.currentCategory === 1) {
      return 'https://wikimedia.org/api/rest_v1/media/math/render/svg/7be821daafcefcac94761c17251ec96c9225a074'
    }
    if (this.props.currentCategory === 2) {
      return 'https://ucarecdn.com/42d286d9-1a02-484e-97df-93431b10c25c/'
    }
    if (this.props.currentCategory === 3) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/EU_Pop2008_1024.PNG/220px-EU_Pop2008_1024.PNG'
    }
    if (this.props.currentCategory === 4) {
      return 'https://rlv.zcache.com/wordart_postcard-rfb088bfab47744e9ab2b52ac00814430_vgbaq_8byvr_324.jpg'
    }
    if (this.props.currentCategory === 5) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/A_Stream_of_Stars_over_Paranal.jpg/220px-A_Stream_of_Stars_over_Paranal.jpg'
    }
    if (this.props.currentCategory === 6) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Chen_Hongshou%2C_leaf_album_painting.jpg/220px-Chen_Hongshou%2C_leaf_album_painting.jpg'
    }
    if (this.props.currentCategory === 7) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Table-sample-appearance-default-params-values-01.gif/300px-Table-sample-appearance-default-params-values-01.gif'
    }
    return ''
  }

  render() {
    const sharedStyle = {
      backgroundColor: '#EEEEEE',
      borderRadius: 5,
      paddingRight: 10,
    }

    const TipContent = [];
    const tips = this.buildTipText()
    for (const index in tips) {
      TipContent.push(
        <p key={index}>{tips[index]}</p>,
      )
    }

    return (
      <div
        style={{ 
                  fontSize: 14,
                  paddingLeft: 5,
              }}
      >
        {TipContent}
      <div
        style = {{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      <img
            src={this.getExampleUrl()}
            alt=""
            class="contain"
            style={{
               maxWidth: 230,
               maxHeight: 270,
               display: 'flex',
               justifyContent: 'space-between',
            }}
       />
       </div >
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentCategory: state.form.currentCategory,
})

export const TipContainer = connect(
  mapStateToProps,
  formActionCreators,
)(Tip)

