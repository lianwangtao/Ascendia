import React from 'react'

export default class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {
          this.props.title
            ? <h4>{this.props.title}</h4>
            : null
        }
        <div>
          {this.props.options}
        </div>
      </div>
    )
  }
}
