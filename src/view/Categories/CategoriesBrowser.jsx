//import React, { Component } from "react";

import React, 
{ 
  useContext, 
  useState, 
  useCallback, 
 // using React.memo to turn a componenet t into a memoized component. 
 //This will force React to never re-render it, unless some of its properties change
  memo ,
  setState,
} from "react";

// import { Route, Switch } from "react-router";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import { createBrowserHistory } from "history";

import { StateDataManager } from "../../stateProvider/DataManager";
import * as api from "../../services/StorageService";
import marker from '@ajar/marker'; 


// import {
//   GoogleMapContainer,
//   // LocationsMap ,
// }from "../GoogleMapsApi/GoogleMapEmbed";

// import AddLocation from "./AddLocation";
// import EditLocation from "./EditLocation";
// import RemoveLocation from "./RemoveLocation";
// import ViewLocation from "./ViewLocation";

// import LocationsMenu from "./LocationsMenu";
// import LocationsTopBar from "./LocationsTopBar";

// import List from "./LocationsList";
// import Filter from "./FilterCategories";
//import Profile from "../Profile";

//import "../styles.css";
//import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { useEffect } from "react";

  //-------------------------------------------------
  //  modify hooks to use a callback like setState
  //  emulate the behavior of the 'classic' setState()
  //-------------------------------------------------
 
  const useStateful = initial => {
    const [value, setValue] = useState(initial);
    return {
      value,
      setValue
    };
  };
  
  const useSetState = initialValue => {
    const { value, setValue } = useStateful(initialValue);
    marker.green(`====== CategoriesBrowser useSetState value ${value} ==========\n`);
    marker.obj(value,`useSetState value\n`);
    marker.obj(setValue,`useSetState setValue\n`);
    return {
      setState: useCallback(v => {
        marker.green(`====== CategoriesBrowser useSetState setState  ==========\n`);

        console.log(`====== CategoriesBrowser useSetState setState  setValue v ==========\n`,v);
        marker.obj(v,`setState setValue v\n`);

        return setValue((oldValue) => {

          console.log(`====== CategoriesBrowser useSetState setState setValue oldValue ==========\n`,oldValue);
          console.log(`====== CategoriesBrowser useSetState setState  setValue v ==========\n`,v);
         return(
            {
          ...oldValue,
          ...(typeof v === 'function' ? v(oldValue) : v)         
         });
      });
      }, []),
      state: value,
    };
  };
 
/*
CategoriesBrowser categories_list  index.js:103 
Array(4)0: {name: "Cat1"}1: {name: "Cat2"}2: {name: "Cat3"}3: {name: "Cat4"}length: 4
__proto__: Array(0)

index.js:63 CategoriesBrowser 
local_categories_list                                                                       
Object
  setState: ƒ (v)
  state: Array(4)0: {name: "Cat1"}1: {name: "Cat2"}2: {name: "Cat3"}3: {name: "Cat4"}
length: 4
__proto__: Array(0)__proto__: Object

//====== CategoriesBrowser useSetState setState  ==========

setState setValue v 
Object
list: Array(4)
0: {name: "Cat1"}
1: {name: "Cat2"}
2: {name: "Cat3"}
3: {name: "Cat4"}
-1: {name: "cat333333", surname: "Baran", birthYear: 1987, birthCity: 63}
length: 4                                                                                                  
CategoriesBrowser onRowUpdate oldData  
Object
  name: "Mehmet"
  surname: "Baran"
  birthYear: 1987
  birthCity: 63
  tableData:
      id: 0
      editing: undefined
      __proto__: Object
  __proto__: Object

CategoriesBrowser onRowUpdate newData
Object
name: "new3333"
surname: "Baran"
birthYear: 1987
birthCity: 63__proto__: Object


*/

//========================================================================
//          CategoriesBrowser
//========================================================================

const CategoriesBrowser = () => {
  const { loading_lists,
    categories_list, set_categories_list, 
  } = useContext(StateDataManager);

  //const [local_categories_list, update_local_categories_list] = useState(categories_list);
  const local_categories_list = useSetState(categories_list);

 
  const updateTableData = useCallback( 
    (list, callbak_f) => {
      marker.blue(`===== CategoriesBrowser updateTableData ======================\n`);
      marker.obj(list, `updateTableData list input\n`);

      //update_local_categories_list( list => set_categories_list(list));
     // local_categories_list.setState(list => set_categories_list(list));
      callbak_f();     
      marker.obj(local_categories_list, `updateTableData local_categories_list\n`);
      marker.obj(categories_list, `updateTableData categories_list\n`);
      marker.blue(`=======================================================\n`);
    }, 
    [categories_list]  );

 

marker.red(`===== CategoriesBrowser regular ======================\n`);
marker.obj(categories_list, `CategoriesBrowser categories_list\n`);
marker.obj(local_categories_list, `CategoriesBrowser local_categories_list\n`);
marker.red(`=======================================================\n`);


  // const history = createBrowserHistory();

  let location = useLocation();
  marker.obj(location, `CategoriessBrowser location \n`);

  let history = useHistory();
  
  
  return (

    <MainBox >

      {loading_lists === false ? (
        <div>
          {/* <Filter /> */}
          <ContentBox>   

            <MaterialTable
                title="Categories list"
                columns={[
                  { title: 'Category', field: 'name', type: 'string' },
                  // { title: 'Surname', field: 'surname' },
                  // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                  // {
                  //   title: 'Birth Place',
                  //   field: 'birthCity',
                  //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                  // },
                ]}
               data={ categories_list}
                  // {
                      // useEffect (() => {
                      //   resolve();
                      // }, [categories_list] )
                   // }

                   //...material-table/dist/material-table.js:278
                   // _this.setState(
                   //   { isLoading: true },
                   //   function () {
                   //       _this.props.data(query)
                   //       .then(function (result) {
                   //             query.totalCount = result.totalCount;
                   //             query.page = result.page;
                   // ...
    
                //  data={[
                //    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                //    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                //  ]}    

                options={{
                  sorting: true
                }}

                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          const list = categories_list; //this.state.data;
                          list.push({name: newData.name});
                         // this.setState({ list }, () => resolve());   
                            //set_categories_list(list );
                            local_categories_list.setState({list}, () => resolve());
                          //updateTableData({list}, () => resolve());
                        }
                        resolve();
                      }, 1000)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          const list = categories_list; ///this.state.data;
                          const index = list.map(e => e.name).indexOf(oldData.name);
                          list[index] = {name: newData.name};
                          //this.setState({ list }, () => resolve());                       
                          //set_categories_list(list );
                          local_categories_list.setState({list}, () => resolve());
                         // local_categories_list.setState({list});
                          //updateTableData({list}, () => resolve());
                          
                          marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${oldData}\n`);
                          console.log(`onRowUpdate found index ${index}`);
                          console.log(`CategoriesBrowser onRowUpdate oldData\n`,oldData);
                          console.log(`CategoriesBrowser onRowUpdate newData\n`,newData);
                          marker.obj(oldData, `CategoriesBrowser onRowUpdate oldData\n`);
                          marker.obj(newData, `CategoriesBrowser onRowUpdate newData\n`);
                          marker.obj(list, `CategoriesBrowser onRowUpdate list\n`);
                          console.log(`CategoriesBrowser onRowUpdate list\n`,list);
                          console.log(`CategoriesBrowser onRowUpdate local_categories_list\n`,local_categories_list);
                          marker.blue(`=======================================================\n`);


                        }
                         resolve();
                      }, 1000)
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          let list = categories_list; /// this.state.data;
                          const index = list.map(e => e.name).indexOf(oldData.name);
                          list.splice(index, 1);
                          //this.setState({ list }, () => resolve());
                          //set_categories_list(list );
                          local_categories_list.setState({list}, () => resolve());
                          //local_categories_list.setState({list});
                          //updateTableData({list}, () => resolve());

                        }
                         resolve();
                      }, 1000)
                    }),
                }}

            />


           {/* <MenuContentBox>
              <MenuBox>                                   
                <LocationsTopBar>
                    <LocationsMenu />
                </LocationsTopBar>  
              </MenuBox>   
           </MenuContentBox> */}

            {/* <List /> */}

          </ContentBox>
        </div>

      ) : (
        <h1>... Loding ...</h1>
      )}
     
    </MainBox>

   
    
    // </Router>
    
  );
};
export default CategoriesBrowser;

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



const MenuBox = styled('div')({
  width: '70rem',
}); 


const MenuContentBox = styled('div')({
  height: '70vh',
  // height: 'fit-content',
  maxHeight: '70rem',
  minHeight: '70vh',

  width: '70rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',   //'flex-start', 
  justifyContent: 'center',   //'space-around',   //'flex-start',
}); 

const ManageLocationsBox = styled('div')({
  // maxHeight: '80vh',
  // height: '65vh',
  //height: 'fit-content',
  // width: 'fit-content',
  // marginTop: 0,
  // paddingTop: 0,

     width: '70rem',
    // width: '60rem',

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


const ModalBox = styled('div')({
  position: "absolute",
  background: "#fff",
  top: 28,
  left: "10%",
  right: "10%",
  padding: 15,
 
  
  width: '60rem',
  height: '75vh',
  // borderRadius: '0.8rem',
  borderRadius: '0.4rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
  boxShadow: '0 0.2rem 0.8rem DimGrey',
  //background: 'rgba(0, 0, 0, 0.15)',

  display: 'flex',
  flexDirection: 'row',
  // alignItems: 'center',   
  alignItems: 'flex-start', 
  justifyContent: 'space-around',   //'flex-start',
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
