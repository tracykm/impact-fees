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
  useParams,
  useLocation
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import styled from "styled-components";

const NavWrapper = styled.nav`
  width: 1200px;
  margin: auto;
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
    <a className="pr-2 py-2" href="http://www.impactfees.com/">
      Home
    </a>
    /{" "}
    <Link className="pr-2 py-2" to="/">
      National Survey
    </Link>
    <Route path="/state/:state">
      <StateBreadcrumb />
    </Route>
    <Route path="/state/:state/jurisdiction/:name">
      <JurisdictionBreadcrumb />
    </Route>
    <Route path="/about">
      <>
        /
        <Link className="p-2" to={`/about`}>
          About
        </Link>
      </>
    </Route>
    <Route path="/national-averages">
      <>
        /
        <Link className="p-2" to={`/national-averages`}>
          National Averages
        </Link>
      </>
    </Route>
    <Route path="/state-averages">
      <>
        /
        <Link className="p-2" to={`/state-averages`}>
          State Averages
        </Link>
      </>
    </Route>
  </div>
);

const Nav = () => {
  const { pathname } = useLocation();
  // ugly hack to make the nav bar stick on home where whole page scrolls
  // without changing for other pages
  return (
    <NavWrapper className={pathname === "/" ? "home" : ""}>
      <Breadcrumbs />
      <div className="title"></div>
    </NavWrapper>
  );
};

const App: React.FC = () => {
  return (
    <div className="m-3">
      <Router>
        <ScrollToTop />
        <Nav />
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
