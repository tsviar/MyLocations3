//import React, { Component } from "react";
import React, { useContext } from "react";
import { StateDataManager } from "../../stateProvider/DataManager";

import {
  GoogleMapContainer,
  // LocationsMap ,
}from "../GoogleMapsApi/GoogleMapEmbed";

import ManageLocation from "./ManageLocation"
// import AddLocation from "./AddLocation"
import EditLocation from "./EditLocation"

import List from "../List";
import Filter from "../Filter";
import Profile from "../Profile";

//import "../styles.css";
//import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';
//import marker from '@ajar/marker'; 




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
            <ManageLocationsBox>
               {/* <Profile/> */}

              <GoogleMapContainer />
           
                {/* <LocationsMap
                lat={selected_map_location.lat}
                lng={selected_map_location.lng}
                zoom={selected_map_location.zoom}
                setCoordinates={setUserPickedCoordinates}
                setAddress={setUserPickedAddress}
              /> */}

            {/* <List /> */}
            <ManageLocation />
            {/* <AddLocation /> */}
            {/* <EditLocation /> */}
            </ManageLocationsBox>
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

//===============================================================
// local styling
//===============================================================

const MainBox = styled('div')({
  minWidth: '100rem',
  maxWidth: '100vw',
  width: '100%',

  background: 'Cornsilk',
  borderRadius: '0.4rem',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 0.4rem 1.5rem DimGrey',
  position: 'relative',
  padding: '7.0rem 1.5rem 1.5rem',
  // marginTop: '3rem',
  fontSize: '1.5rem',

  // padding: '8.5rem 1.5rem 1.5rem','
  // margin-top: '10rem',' 
  // font-size: '3rem',' 
}); 

const ContentBox = styled('div')({
 
  //border:red solid 2px;
  borderRadius: '5px',

  display: 'flex',
  alignItems: 'center', 
  // alignItems: 'space-between',   //
  // alignItems: 'flex-start', 
  justifyContent: 'space-around',   //'flex-start',
}); 


const ManageLocationsBox = styled('div')({
  // maxHeight: '80vh',
  // height: '65vh',
  // width: 'fit-content',
  // marginTop: 0,
  // paddingTop: 0,

    width: '60rem',
    // borderRadius: '0.8rem',
   borderRadius: '0.4rem',
   overflowX: 'hidden',
   overflowY: 'scroll',
   boxShadow: '0 0.2rem 0.8rem DimGrey',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',   //'flex-start', 
  justifyContent: 'space-around',   //'flex-start',
 
  // alignItems: 'space-between',   //'flex-start', 
  // justifyContent: 'space-between',   //'flex-start',  
}); 

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
