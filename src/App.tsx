import React from "react";
import "./App.css";
import { About } from "./components/About";
import { NationalAveragesPage } from "./components/NationalAveragesPage";
import { OverallTable } from "./components/OverallTable";
import { JurisdictionPage } from "./components/JurisdictionPage";
import { StateAveragesPage } from "./components/StateAveragesPage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Link className="p-2" to="/">
        Home
      </Link>
      <Link className="p-2" to="/national-averages">
        National Averages
      </Link>
      <Link className="p-2" to="/about">
        About
      </Link>
      <Switch>
        <Route path="/jurisdiction/:name">
          <JurisdictionPage />
        </Route>
        <Route path="/state/:state">
          <StateAveragesPage />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/national-averages">
          <NationalAveragesPage />
        </Route>
        <Route path="">
          <OverallTable />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
