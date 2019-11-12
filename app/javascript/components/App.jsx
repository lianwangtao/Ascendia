import React from "react"
import 'typeface-roboto'
import { CloudinaryContext } from 'cloudinary-react';
import Routes from "../routes/Index"

class App extends React.Component {

    render() {
        return (
            <CloudinaryContext cloudName={this.props.cloudName} >
                {Routes}
            </CloudinaryContext>
        )
    }
}

export default App
