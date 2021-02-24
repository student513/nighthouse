import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { NavBar } from "./components"
import { AnalysisList, CreateAnalysis, Home, Details, Tutorial, ListTutorial, DetailTutorial } from "./pages"

import "bootstrap/dist/css/bootstrap.min.css"
import "./style/App.css"

function App() {
  return (
    <Router>
      <NavBar />
      <div className="app-container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/url/create" exact component={CreateAnalysis} />
          <Route path="/url/list" exact component={AnalysisList} />
          <Route path="/url/list/:name/:profileId" component={Details} />
          <Route path="/create-tutorial" exact component={Tutorial} />
          <Route path="/list-tutorial" exact component={ListTutorial} />
          <Route path="/detail-tutorial" exact component={DetailTutorial} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
