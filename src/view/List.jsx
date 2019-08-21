import React, { useContext } from "react";
import { StateDataManager } from "../stateProvider/DataManager";
import Card from "./Card";
import styled from "styled-components";

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

const Box = styled.div`
  background: oldlace;
  height: 85vh;
  min-width: 56rem;
  border-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: 0 0.2rem 0.8rem DimGrey;
`;

const CardItem = styled.li`
  &:nth-child(even) {
    background: honeydew;
  }
  &:nth-child(odd) {
    background: white;
  }
`;

/*
  return (
    <div className="cards-list">
      <ul> {create_list_ui(filtered_list, update_selected_card)} </ul>
    </div>
  );
*/

/*
const create_list_ui = (items, update_selected_card) =>
  items.map(item => (
    <li
      key={item.id}
      className="card-item"
      onClick={() => update_selected_card(item)}
    >
      <Card {...item} />
    </li>
  ));
 */
