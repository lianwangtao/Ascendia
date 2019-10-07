import React from 'react'

export class PageTitle extends React.Component {
  render() {
    return (
      <div className="page-header">
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}
