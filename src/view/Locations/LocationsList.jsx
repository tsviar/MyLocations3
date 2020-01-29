import React, { useContext } from "react";
import { StateDataManager } from "../../stateProvider/DataManager";

import Location from "./Location";
// import Card from "./Card";
// import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';
import marker from '@ajar/marker'; 


//const List = ({ list_data, updateSelectedCard }) => {
const LocationsList = () => {
  // const { filtered_list, update_selected_card } = useContext(StateDataManager);
  const { 
    selected_location, update_selected_location,
    original_Locations_list, 
    filtered_Locations_list, 
    update_Locations_filtered_list,
  } = useContext(StateDataManager);

  //update_Locations_filtered_list(original_Locations_list);
  console.log(`LocationsList original_Locations_list `, original_Locations_list);
  console.log(`LocationsList filtered_Locations_list `, filtered_Locations_list);

  return (
    <Box>
       {/* <ul> {create_list_ui(original_Locations_list, update_selected_location)} </ul> */}
       <ul> {create_list_ui(filtered_Locations_list, update_selected_location)} </ul>
    </Box>
  );
};

// Note:
//create_list_ui now gets 2 inputs: list_data, update_selected_location

// Note
//in order to pass parameters to the onClick called function,
// we need to DEFINE (!!!) a new func, an arrow func is best,
// which will get the item that was selected
//It has to be on the DOM element, the li!!!

const create_list_ui = (items, update_selected_location) =>
   items.map(item => (
    <CardItem key={item.id} onClick={() => update_selected_location(item)}>
      <Location {...item} />
    </CardItem>
  ));


export default LocationsList;


/*

//const List = ({ list_data, updateSelectedCard }) => {
const List = () => {
  const { filtered_list, update_selected_card } = useContext(StateDataManager);

  // Note:
  //create_list_u now gets 2 inputs: list_data, updateSelectedCard

  return (
    <Box>
      <ul> {create_list_ui(filtered_list, update_selected_card)} </ul>
    </Box>
  );
};

// Note
//in order to pass parameters to the onClick called function,
// we need to DEFINE (!!!) a new func, an arrow func is best,
// which will get the item that was selected
//It has to be on the DOM element, the li!!!

const create_list_ui = (items, update_selected_card) =>
  items.map(item => (
    <CardItem key={item.id} onClick={() => update_selected_card(item)}>
      <Card {...item} />
    </CardItem>
  ));

export default List;

*/
const Box = styled('div')({
  background: 'oldlace',
  height: '70vh',
  // height: 85vh', 
  // minWidth: '60rem',
 // maxWidth: '56vw',
 // width: '56%',
   
  minWidth: '30rem', //'30rem'
  maxWidth: '40vw', //'40vw'
  width: '35%',      //'35%'

  // marginLeft: '20',
  //paddingLeft: '20',

  borderRadius: '0.4rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
  boxShadow: '0 0.2rem 0.8rem DimGrey',
});

const CardItem = styled('li')({

  '&:nth-child (even)': {
    background: 'honeydew',
  },
  '&:nth-child (odd)': {
    background: 'white',
  }
});


