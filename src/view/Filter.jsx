import React, { useContext, useState } from "react";
import { StateDataManager } from "../stateProvider/DataManager";

//import "../styles.css";
import styled from "styled-components";

const Filter = () => {
  const { original_list, update_filtered_list } = useContext(StateDataManager);

  ///pay attention to [] !!!!
  const [num_elements, set_num_elements] = useState(0);

  console.log(`Filter num_elements 1 ${num_elements}`);

  const update_list = event => {
    const txt = event.target.value;

    const filtered_list = original_list.filter(item =>
      item.first_name.toLowerCase().includes(txt.toLowerCase())
    );
    update_filtered_list(filtered_list);
    set_num_elements(filtered_list.length);
    console.log(`update_list filtered_list.length ${filtered_list.length}`);
  };

  console.log(`Filter num_elements 2 ${num_elements}`);

  const items_count = num_elements || original_list.length;
  console.log(`items_count 3 ${items_count}`);

  return (
    <Header>
      <Title>{items_count} items filtered</Title>
      <Input onChange={update_list} />
    </Header>
  );
};
export default Filter;

const Header = styled.div`
  background: lightsalmon;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0.4rem 0.4rem 0 0;
  height: 9rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.h4`
  font-family: "Expletus Sans";
  text-align: left;
  /* font-size: 2rem; */
  font-size: 1rem;
  font-weight: 400;
  color: darkred;
`;
const Input = styled.input`
  height: 3.5rem;
  width: 24rem;
  outline: none;
  border-radius: 0.5rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;

  &:focus {
    border: tomato 2px solid;
  }
`;

/*
return (
  <div className="header">
    <h4 className="filter_title">{items_count} items filtered</h4>
    <input className="filter" onChange={update_list} />
  </div>
);
*/
