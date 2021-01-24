import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NavBar } from "./components";
import { AnalysisList, CreateAnalysis, Home, Detail } from "./pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="Container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/url/create" exact component={CreateAnalysis} />
          <Route path="/url/list" exact component={AnalysisList} />
          <Route path="/url/list/:id" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
