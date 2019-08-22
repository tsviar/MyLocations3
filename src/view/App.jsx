import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import styled from "styled-components";
//import "./styles.css";
import GlobalStyles from "./globalStyles";

import { WrapperDataManager } from "../stateProvider/DataManager";
import HomePage from "./HomePage";
import ProfilesBrowser from "./ProfilesBrowser";
import AddLocation from "./Locations/AddLocation";

// since Links is exported as default,
// we can name it as we wish' hence, Menu
import Menu from "./MainMenu";
import TopBar from "./TopBar";
import MainBottomBar from "./MainBottomBar";

//import ls from "local-storage";

// exact path = "/"
const App = () => (
  <Router>
    <Box>
      {/* <TopBar>
        <Menu />
      </TopBar> */}

      <Route exact path="/" component={HomePage} />

      <WrapperDataManager>
        <Route path="/locations" component={ProfilesBrowser} />

      <Route path="/categories" component={AddLocation} />
      </WrapperDataManager>

      <MainBottomBar/>

      <GlobalStyles />
    </Box>
  </Router>
);
export default App;

const Box = styled.div`
  /* background: lightskyblue; */
  /* padding: 3rem 7.5rem; */
  padding: 1rem 10rem 4rem 10rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
`;
