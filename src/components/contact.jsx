import {
  Card,
  CardTitle,
  CardText,
  RaisedButton,
  CardActions,
} from 'material-ui'
import {
  Col,
  Row,
} from 'react-bootstrap'
import React from 'react'
import { PageTitle } from './page_title'

export function Contact() {
  return (
    <div>
      <Row>
        <Col xs={12} md={12}>
          <PageTitle title="Contact Us" />
        </Col>
      </Row>

      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card className='form-card' style={{ display: 'flex' }}>
          <CardText style={{ textAlign: 'center' }}>
            <h2
              style={{
                marginTop: 50,
              }}
            >
              Please feel free to contact us at any time.
            </h2>

            <h3
              style={{
                marginTop: 15,
                marginBottom: 50,
              }}
            >
              We would love to hear your feedback.
            </h3>
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
            <RaisedButton
              href="https://aviatr.waisman.wisc.edu/"
              icon={
                <i
                  className="material-icons email-icon"
                  style={{
                    color: 'white',
                  }}
                >
                  home
                </i>
              }
              label="Website"
              primary
              target="_blank"
              style={{
                float: 'right',
              }}
            />
          </CardActions>
        </Card>
      </Row>
    </div>
  )
}
