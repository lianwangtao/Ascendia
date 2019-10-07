import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui'
import React from 'react'
import { PageTitle } from './page_title'

export function About() {
  return (
    <div>
      <div>
        <div>
          <PageTitle title="About Us" />
        </div>

        <div>
          <Card className='form-card'>
            <CardTitle title="Coming soon..." />
          </Card>
        </div>
      </div>
    </div>
  )
}
