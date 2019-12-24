import React from "react";
import "./App.css";
import { About } from "./components/About";
import { AllStateAveragesPage } from "./components/AllStateAveragesPage";
import { NationalAveragesPage } from "./components/NationalAveragesPage";
import { OverallTable } from "./components/OverallTable";
import { JurisdictionPage } from "./components/JurisdictionPage";
import { StateAveragesPage } from "./components/StateAveragesPage";
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  useParams
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import styled from "styled-components";

const NavWrapper = styled.nav`
  display: flex;
  .title {
    flex-grow: 1;
    text-align: center;
  }
  font-size: 18px;
`;

const StateBreadcrumb = () => {
  const { state } = useParams();
  return (
    <>
      /
      <Link className="p-2" to={`/state/${state}`}>
        {state}
      </Link>
    </>
  );
};

const JurisdictionBreadcrumb = () => {
  const { state, name } = useParams();
  return (
    <>
      /
      <Link className="p-2" to={`/state/${state}/jurisdiction/${name}`}>
        {name}
      </Link>
    </>
  );
};

const Breadcrumbs = () => (
  <div>
    <Link className="pr-2 py-2" to="/">
      Home
    </Link>
    <Route path="/state/:state">
      <StateBreadcrumb />
    </Route>
    <Route path="/state/:state/jurisdiction/:name">
      <JurisdictionBreadcrumb />
    </Route>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="m-3">
      <Router>
        <ScrollToTop />
        <NavWrapper>
          <Breadcrumbs />
          <div className="title">Impact Fee Survey</div>
          <div>
            <Link className="p-2" to="/national-averages">
              National Averages
            </Link>
            <Link className="p-2" to="/about">
              About
            </Link>
          </div>
        </NavWrapper>
        <Switch>
          <Route path="/state/:state/jurisdiction/:name">
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
          <Route path="/state-averages">
            <AllStateAveragesPage />
          </Route>
          <Route path="">
            <OverallTable />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
