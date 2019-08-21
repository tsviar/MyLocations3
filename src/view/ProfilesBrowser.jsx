//import React, { Component } from "react";
import React, { useContext } from "react";
import { StateDataManager } from "../stateProvider/DataManager";

import List from "./List";
import Filter from "./Filter";
import Profile from "./Profile";

//import "../styles.css";
import styled from "styled-components";

const ProfilesBrowser = () => {
  const { loading_profiles } = useContext(StateDataManager);

  return (
    <Box>
      {loading_profiles === false ? (
        <div>
          <Filter />
          <ContentBox>
            <Profile />
            <List />
          </ContentBox>
        </div>
      ) : (
        <h1>... Loding ...</h1>
      )}
    </Box>
  );
};
export default ProfilesBrowser;

const Box = styled.div`
  background: Cornsilk;
  padding: 8.5rem 1.5rem 1.5rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.4rem 1.5rem DimGrey;
  position: relative;
  margin-top: 10rem;
  font-size: 3rem;
`;

const ContentBox = styled.div`
  /*border:red solid 2px;*/
  border-radius: 5px;
  display: flex;
`;

/*
  return (
    <div className="app">
      <Filter />
      <div className="content-box">
        <Profile />
        <List />
      </div>
    </div>
  ); 
  */
