import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../components/Home"
import Videos from "../components/Videos"
import Video from "../components/Video"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/videos" exact component={Videos} />
      <Route path="/video/:id" exact component={Video} />
    </Switch>
  </Router>
)
