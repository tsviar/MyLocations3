import React from "react";
import ReactDOM from "react-dom";

import App from "./view/App";

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
