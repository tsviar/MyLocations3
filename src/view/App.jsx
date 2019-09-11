import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//customize
import styled from "styled-components";
//import "./styles.css";
import GlobalStyles from "../style.lib/globalStyles";
// customize with material-ui
import settings from '../style.lib/settings';
import colors from '../style.lib/colors';

// Material-UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { WrapperDataManager } from "../stateProvider/DataManager";
import HomePage from "./HomePage";
import ProfilesBrowser from "./ProfilesBrowser";

import LocationsBrowser from "./Locations/LocationsBrowser";
import AddLocation from "./Locations/AddLocation";

// since Links is exported as default,
// we can name it as we wish' hence, Menu
import Menu from "./MainMenu";
import TopBar from "./TopBar";
import MainBottomBar from "./MainBottomBar";


let theme = createMuiTheme({
  palette: {
    primary: settings.theme.primaryColor.import,
    secondary: settings.theme.secondaryColor.import,
    type: settings.theme.type
  }
});


//import ls from "local-storage";

// exact path = "/"
const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Box>
        {/* <TopBar>
          <Menu />
        </TopBar> */}

        <Route exact path="/" component={HomePage} />

        <WrapperDataManager>
          {/* <Route path="/locations" component={ProfilesBrowser} /> */}
          <Route path="/locations" component={LocationsBrowser} />

        <Route path="/categories" component={AddLocation} />

        </WrapperDataManager>

        <MainBottomBar/>


        <GlobalStyles />
      </Box>
   </MuiThemeProvider>
  </Router>
);
export default App;

const Box = styled.div`
  max-width: 100vw;
  /* background: lvwightskyblue; */
  /* padding: 3rem 7.5rem; */
  padding: 2rem 10rem 5rem 10rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
`;
