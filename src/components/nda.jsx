import { connect } from 'react-redux'
import React from 'react'
import {
  Card,
  CardTitle,
  CardText,
  RaisedButton,
  CardActions,
} from 'material-ui'
import moment from 'moment'
import * as userActionCreators from '../action_creators/user_actions'

class NDA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  declineNDA = () => {
    if (this.state.ndaAgreement === false) {
      this.setState({
        ndaAgreement: true,
      })
    } else {
      this.setState({
        ndaAgreement: false,
      })
    }
  }

  acceptNDA = () => {
    this.props.acceptNDA(this.props.user.id)
  }


  render() {
    const ndaContent = (
      <div>
        <h2 style={{ textAlign: 'center' }}>Non-disclosure Agreement</h2>
        <p>THIS AGREEMENT is made and entered into as {moment().format('MMMM Do YYYY')} (“Effective Date”), by and between AVIATR Lab @ The University of Wisconsin-Madison and {`${this.props.user.firstName} ${this.props.user.lastName}`}, (“the Recipient”) (collectively, “the Parties”).</p>
        <p>Purpose for Disclosure (“Business Purpose”): User testing</p>
        <p>The Parties hereby agree as follows:</p>
        <p>1. For purposes of this Agreement, &quot;Confidential Information&quot; shall mean any and all non-public information, including, without limitation, technical, developmental, marketing, sales, operating, performance, cost, know-how, business plans, business methods, and process information, disclosed to the Recipient. </p>
        <p>2. All Confidential Information disclosed to the Recipient will be used solely for the Business Purpose and for no other purpose whatsoever. The Recipient agrees to keep the Disclosing Party’s Confidential Information confidential and to protect the confidentiality of such Confidential Information with the same degree of care with which it protects the confidentiality of its own confidential information, but in no event with less than a reasonable degree of care. <b>Recipient shall not make any copies of Disclosing Party’s Confidential Information.</b></p>
        <p>3. All right title and interest in and to the Confidential Information shall remain with Disclosing Party or its licensors. Nothing in this Agreement is intended to grant any rights to Recipient under any patents, copyrights, trademarks, or trade secrets of Disclosing Party. ALL CONFIDENTIAL INFORMATION IS PROVIDED &quot;AS IS&quot;. THE DISCLOSING PARTY MAKES NO WARRANTIES, EXPRESS, IMPLIED OR OTHERWISE, REGARDING NON-INFRINGEMENT OF THIRD PARTY RIGHTS OR ITS ACCURACY, COMPLETENESS OR PERFORMANCE.</p>
        <p>4. The obligations and limitations set forth herein regarding Confidential Information shall not apply to information which is: (a) at any time in the public domain, other than by a breach on the part of the Recipient;
     or (b) at any time rightfully received from a third party which had the right to and transmits it to the Recipient without any obligation of confidentiality.</p>
        <p>5. In the event that the Recipient shall breach this Agreement, or in the event that a breach appears to be imminent, the Disclosing Party shall be entitled to all legal and equitable remedies afforded it by law, and in addition may recover all reasonable costs and attorneys' fees incurred in seeking such remedies. If the Confidential Information is sought by any third party, including by way of subpoena or other court process, the Recipient shall inform the Disclosing Party of the request in sufficient time to permit the Disclosing Party to object to and, if necessary, seek court intervention to prevent the disclosure. </p>
        <p>6. The validity, construction and enforceability of this Agreement shall be governed in all respects by the law of the State. This Agreement may not be amended except in writing signed by a duly authorized representative of the respective Parties. This Agreement shall control in the event of a conflict with any other agreement between the Parties with respect to the subject matter hereof.</p>
        <p>By Clicking the Signup button, you certify that you have read the terms of this agreement and agree to be bound by it as of the date first above written.</p>
      </div>
    )

    const declinedContent = (
      <div>
        <h4>To use the Image Categorization Tool, you need to agree to the Non-disclosure Agreement</h4>
        <RaisedButton label="Go Back to Agreement" onClick={this.declineNDA} />
      </div>
    )

    return (
      <Card>
        <CardText
          style={{
            padding: 20,
          }}
        >
          { this.state.ndaAgreement === false
            ? declinedContent
            : ndaContent
          }

        </CardText>
        <CardActions>
          <RaisedButton
            label="I Agree"
            primary
            onClick={this.acceptNDA}
          />
          <RaisedButton
            label="I do NOT Agree"
            secondary
            onClick={this.declineNDA}
          />
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export const NDAContainer = connect(
  mapStateToProps,
  userActionCreators,
)(NDA)