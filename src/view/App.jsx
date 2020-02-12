import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

//customize
// import styled from "styled-components";
//import "./styles.css";
import GlobalStyles from "../style.lib/globalStyles";
// customize with material-ui
import settings from '../style.lib/settings';
import colors from '../style.lib/colors';

// Material-UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles, styled } from '@material-ui/core/styles';
import marker from '@ajar/marker'; 

import { WrapperDataManager } from "../stateProvider/DataManager";
import HomePage from "./HomePage";
// import ProfilesBrowser from "./ProfilesBrowser";


import CategoriesBrowser from "./Categories/CategoriesBrowser";

import LocationsBrowser from "./Locations/LocationsBrowser";
import AddLocation from "./Locations/AddLocation";
import EditLocation from "./Locations/EditLocation";
import RemoveLocation from "./Locations/RemoveLocation";
import ViewLocation from "./Locations/ViewLocation";


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


const history = createBrowserHistory();

//import ls from "local-storage";

// exact path = "/"
const App = () => (
  <Router history={history}>
    <MuiThemeProvider theme={theme}>
      <AppBox>
        {/* <TopBar>
          <Menu />
        </TopBar> */}

        <Route exact path="/" component={HomePage} />

        <WrapperDataManager>

            <Switch>

          {/* <Route path="/locations" component={ProfilesBrowser} /> */}
 
                 {/* <Route exact path="/categories" children={< AddLocation />} /> */}
                 <Route exact path="/categories" children={< CategoriesBrowser />} />
                 
           

                 <Route exact path="/locations"  children= {<LocationsBrowser />} />
                 {/* component={LocationsBrowser} /> */}

                  <Route exact path="/locations/view"  
                        children={  () =>  <LocationsBrowser />  } />
                  <Route exact path="/locations/add"  
                        children={  () =>  <LocationsBrowser />  } />
                  <Route exact path="/locations/edit"  
                        children={  () =>  <LocationsBrowser />  } />
                  <Route path="/locations/remove" 
                        children={  () =>  <LocationsBrowser />  } />
                  {/* <Route path="/locations" children={<AddLocation />} /> */}


            </Switch>


        </WrapperDataManager>

        <MainBottomBar/>


        <GlobalStyles />
      </AppBox>
   </MuiThemeProvider>
  </Router>
);
export default App;

const AppBox = styled('div')({
  maxWidth: '100vw',
  // background: 'lvwightskyblue', 
  // padding: '3rem 7.5rem', 
  padding: '2rem 10rem 5rem 10rem',
  borderRadius: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
});
