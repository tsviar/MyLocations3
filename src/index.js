import React from "react";
import ReactDOM from "react-dom";
//import { render } from "react-dom";

import App from "./view/App";
// import ProfilesBrowser from "./view/ProfilesBrowser";
// import { WrapperDataManager } from "./stateProvider/DataManager";

// //import "./styles.css";
// import GlobalStyles from "./view/globalStyles";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
//render(<App />, rootElement);

/*
ReactDOM.render(
  <WrapperDataManager>
    <ProfileBrowser />
    <GlobalStyles />
  </WrapperDataManager>,
  rootElement
);
*/
