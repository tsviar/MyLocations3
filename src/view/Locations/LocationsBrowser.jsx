//import React, { Component } from "react";
import React, { useContext } from "react";
import { StateDataManager } from "../../stateProvider/DataManager";

import {
  GoogleMapContainer,
  // LocationsMap ,
}from "../GoogleMapsApi/GoogleMapEmbed";

import AddLocation from "./AddLocation"

import List from "../List";
import Filter from "../Filter";
import Profile from "../Profile";

//import "../styles.css";
import styled from "styled-components";

import { makeStyles } from '@material-ui/core/styles';


const LocationsBrowser = () => {
  const { loading_profiles } = useContext(StateDataManager);

  const { 
    selected_map_location, 
    update_selected_map_location 
  } = useContext(StateDataManager);

//console.log(`LocationsBrowser prpos `, props);
console.log(`LocationsBrowser selected_map_location `, selected_map_location);

  const setUserPickedCoordinates = ({ lat, lng }) => {
    update_selected_map_location({ lat: lat, lng: lng });
  };

  const setUserPickedAddress = (str) => {
    update_selected_map_location({ address: str });
  };


  return (
    // <div >
    //   <ContentBox>
    //       <LocationsMap 
    //           lat={selected_map_location.lat}
    //           lng={selected_map_location.lng}
    //           zoom={selected_map_location.zoom}
    //           setCoordinates={setUserPickedCoordinates}
    //           setAddress={setUserPickedAddress}           
    //         />
    //   </ContentBox>
    // </div>

    <MainBox>
      {loading_profiles === false ? (
        <div>
          <Filter />
          <ContentBox>     
               {/* <Profile/> */}

              <GoogleMapContainer />
           
                {/* <LocationsMap
                lat={selected_map_location.lat}
                lng={selected_map_location.lng}
                zoom={selected_map_location.zoom}
                setCoordinates={setUserPickedCoordinates}
                setAddress={setUserPickedAddress}
              /> */}

            <List />
          </ContentBox>
        </div>
      ) : (
        <h1>... Loding ...</h1>
      )}
    </MainBox>
  );
};
export default LocationsBrowser;

const MainBox = styled.div`
  min-width: 100rem;
  max-width: 100vw;
  width: 100%;

  background: Cornsilk;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.4rem 1.5rem DimGrey;
  position: relative;
  padding: 7.0rem 1.5rem 1.5rem;
  margin-top: 3rem;
  font-size: 1.5rem;

  /* padding: 8.5rem 1.5rem 1.5rem; */
  /* margin-top: 10rem; */
  /* font-size: 3rem; */
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
