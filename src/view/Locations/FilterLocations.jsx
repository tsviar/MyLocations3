import React, { useContext, useState, useEffect} from "react";
import { StateDataManager } from "../../stateProvider/DataManager";

import TableSortLabel from '@material-ui/core/TableSortLabel';
import SortRounded from  '@material-ui/icons/SortRounded';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

//import "../styles.css";
import styled from "styled-components";
import marker from "@ajar/marker";


const FilterLocations = () => {
  const { original_list, filtered_list, update_filtered_list } = useContext(StateDataManager);
  const { 
    filtered_Locations_list, update_Locations_filtered_list,
    original_Locations_list, set_original_Locations_list,
    locations_filter_text, set_locations_filter_text,
    locations_edited_flag, set_locations_edited_flag,
    locations_sort_order, set_locations_sort_order,
  } = useContext(StateDataManager);


  
  ///pay attention to [] !!!!
  const [num_elements, set_num_elements] = useState(0);
  const [order, setOrder] = useState('asc');
  // const [filter_text, set_filter_text] = useState("");

  let  items_count = filtered_Locations_list.length || original_Locations_list.length;

  marker.green(`Filter num_elements 1 ${num_elements}`);

  //------------------------------------------------------------------------------
  //          Sort asc or desc
  //------------------------------------------------------------------------------

  const handleRequestSort = event => {
    sortList(filtered_Locations_list, true);
    // const isAsc = locations_sort_order === 'asc';    
    // set_locations_sort_order(isAsc ? 'desc' : 'asc');
  };


  const sortList = (curr_filtered_Locations_list, changeOrder) => {

    const isAsc = locations_sort_order === 'asc';   

    console.log(`sortList() FilterLocations curr_filtered_Locations_list `, curr_filtered_Locations_list);
    marker.red(`sortList() curr order = ${locations_sort_order} isAsc ${isAsc}\n`);

    // const filtered_list = filtered_Locations_list.sort((a, b) => (a.name< b.name ? -1 : 1) * (isAsc ? 1 : -1));

    let filtered_list = curr_filtered_Locations_list;
    console.log(`sortLiat() FilterLocations SORTED filtered_list 1 `, filtered_list);

    filtered_list.sort(
      (a, b) => {
        marker.red(`sortList() a.name "${a.name}" `);
        marker.red(`sortList() b.name "${b.name}" `);
        marker.red(`sortList() result ${((a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1))} `);

        // marker.red(`sortList() result ${(isAsc === 'asc'  ? (a.name.toLowerCase().localeCompare( b.name)) : -( a.name.toLowerCase().localeCompare( b.name))) }`);

        // return ( isAsc === 'asc'  ?  (a.name.toLowerCase().localeCompare( b.name)) : -( a.name.toLowerCase().localeCompare( b.name)) );

       // return ( (a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1) );
     
       const keyA = a.name;
       const keyB = b.name;
       if (keyA < keyB) return (-1 * (isAsc ? 1 : -1));
       if (keyA > keyB) return (1 * (isAsc ? 1 : -1));
       return 0;
     
      } );  
     
    
     update_Locations_filtered_list(filtered_list);
     if (changeOrder) {
       setOrder(isAsc ? 'desc' : 'asc'); 
       set_locations_sort_order(isAsc ? 'desc' : 'asc'); 
     }
     
     console.log(`sortLiat() FilterLocations SORTED filtered_list `, filtered_list);
     console.log(`sortLiat() FilterLocations SORTED filtered_Locations_list `, filtered_Locations_list);


     //===========================
// let users = [
//   {name: 'Scotty', age: '18'},
//   {name: 'Tommy', age: '21'},
//   {name: 'Sally', age: '71'},
//   {name: 'Billy', age: '18'},
//   {name: 'Timmy', age: '21'}
// ];

// console.log(`sortLiat() users 1 `, users);

// users.sort((a, b) => {
//   let keyA = a.age + a.name;
//   let keyB = b.age + b.name;
//   if (keyA < keyB) return (-1 * (isAsc ? 1 : -1));
//   if (keyA > keyB) return (1 * (isAsc ? 1 : -1));
//   return 0;
// });

// console.log(`sortLiat() users 2 `, users);
//===========================

  };


 
  marker.blue(`FilterLocations NEW order = ${locations_sort_order}\n`);
  console.log(`FilterLocations filtered_Locations_list `, filtered_Locations_list);
 


  const update_list = event => {
    const txt = event.target.value;

    // set_filter_text(txt);
    set_locations_filter_text(txt);

    const filtered_list = original_Locations_list.filter(item =>
      item.name.toLowerCase().includes(txt.toLowerCase())

    // const filtered_list = original_Locations_list.filter(item =>
    //   item.first_name.toLowerCase().includes(txt.toLowerCase())
    );

    sortList(filtered_list, false);

   // update_Locations_filtered_list(filtered_list);
    //marker.green(`update_list: num_elements 2 ${num_elements}`);
    set_num_elements(filtered_Locations_list.length);
   // marker.green(`update_list num_elements 3 ${num_elements}`);

   // marker.magenta (`update_list filtered_list.length ${filtered_list.length}`);
  };



  // Update upon original_Locations_list change
 
  useEffect(() => {
    
    marker.red(`FilterLocations useEffect on original_Locations_list\n`);
    console.log(`FilterLocations original_Locations_list `, original_Locations_list);
    console.log(`FilterLocations filtered_Locations_list `, filtered_Locations_list);

    
    const filtered_list = original_Locations_list.filter(
      item =>  item.name.toLowerCase().includes(locations_filter_text.toLowerCase())

    // const filtered_list = original_Locations_list.filter(item =>
    //   item.first_name.toLowerCase().includes(txt.toLowerCase())
    );
    
    sortList(filtered_list, false);

    // update_Locations_filtered_list(filtered_list);
    //marker.green(`update_list: num_elements 2 ${num_elements}`);
    set_num_elements(filtered_Locations_list.length);
 
    console.log(`FilterLocations original_Locations_list  2 `, original_Locations_list);
    console.log(`FilterLocations filtered_Locations_list 2 `, filtered_Locations_list);
     
  }, [original_Locations_list.length, locations_edited_flag]);


  // Update upon original_Locations_list change
 
  useEffect(() => {
    const filtered_list = filtered_Locations_list;
    sortList(filtered_list, false);
    console.log(`FilterLocations filtered_Locations_list changed `, filtered_Locations_list);
    marker.blue(`order ${order} locations_sort_order ${locations_sort_order}\n`);
  },  [locations_sort_order, filtered_Locations_list.length]);


  //marker.green(`Filter num_elements 4 ${num_elements}`);

  //marker.blue(`items_count 1 ${items_count}`);
  items_count = filtered_Locations_list.length;
 // marker.blue(`items_count 2 ${items_count}`);

  return (
    <Header>
      <Title>{items_count} items filtered</Title>
      <Input onChange={update_list} />
      {/* <TableSortLabel
              active={true}
              direction={order }
              onClick={handleRequestSort}
            /> */}
      {/* <Button variant="contained" color="primary" disableElevation>  </Button>
      */}
      <IconButton 
      variant="contained" 
      color="primary" 
      aria-label="sort list"
      onClick={event => handleRequestSort(event)}
       >
        <SortRounded />
      </IconButton>
      
   
    </Header>
  );
};
export default FilterLocations;

const Header = styled.div`
  background: lightsalmon;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0.4rem 0.4rem 0 0;
  height: 5rem;
  /* height: 9rem; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.h4`
  font-family: "Expletus Sans";
  text-align: left;
  /* font-size: 2rem; */
  font-size: 1.3rem;
  font-weight: 400;
  color: darkred;
`;
const Input = styled.input`
  height: 1.75rem;
  /* height: 3.5rem; */
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
