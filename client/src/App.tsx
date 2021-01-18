import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NavBar } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnalysisList, CreateAnalysis, Home } from "./pages";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/url/create" exact component={CreateAnalysis} />
        <Route path="/url/list" exact component={AnalysisList} />
      </Switch>
    </Router>
  );
}

export default App;
