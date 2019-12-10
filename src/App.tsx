import React from "react";
import "./App.css";
import { OverallTable } from "./components/OverallTable";
import { Jurisdiction } from "./components/Jurisdiction";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/jurisdiction/:name">
          <Jurisdiction />
        </Route>
        <Route path="">
          <OverallTable />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
