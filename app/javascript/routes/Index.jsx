import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../components/Home"
import Recipes from "../components/Recipes"
import Recipe from "../components/Recipe"
import NewRecipe from "../components/NewRecipe"
import Videos from "../components/Videos"
import Video from "../components/Video"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe/:id" exact component={Recipe} />
      <Route path="/recipe" exact component={NewRecipe} />
      <Route path="/videos" exact component={Videos} />
      <Route path="/video/:id" exact component={Video} />
    </Switch>
  </Router>
)
