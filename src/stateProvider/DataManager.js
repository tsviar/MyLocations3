import React, { useState, useEffect } from "react";
//import robots_data from "../robots-data.json";

import * as api from "../services/ProfileSevice";

const data_url = "https://api.myjson.com/bins/yt3d9";

const StateDataManager = React.createContext();
const { Provider } = StateDataManager;

const WrapperDataManager = ({ children }) => {
  console.log(`in WrapperDataManager`);

  // const [original_Locations_list, set_original_Locations_list] = useState([]);
  const [original_Locations_list, set_original_Locations_list] = useState([
    {
      id: 1,
      name: 'Demo Location',
      address: 'ha nadiv 18, Tel Aviv',
      // coordinates: {lat: -389.76, lng: 45.12},
      lat: 31.776847698411576, 
      lng: 35.20543098449707, 
      category: 'Cat1',
    }
  ]);

  const [filtered_Locations_list, update_Locations_filtered_list] = useState(original_Locations_list);
  const [locations_filter_text, set_locations_filter_text] = useState('');
  const [locations_edited_flag, set_locations_edited_flag] = useState(0);
  const [locations_sort_order, set_locations_sort_order] = useState('asc');
  const [locations_sort_by_category, set_locations_sort_by_category] = useState(false);



  const [selected_location, update_selected_location] = useState(original_Locations_list[0]);
  //({});
  const [initial_location, update_initial_location] = useState(original_Locations_list[0]);
  //({});
  const [selected_map_location, update_selected_map_location] = useState( {
    address:'',

    // lat: -34.397,
    // lng: 150.644,
    lat: 31.776847698411576, 
    lng: 35.20543098449707, 

    //   zoom: 8,
    //   zoom: 1, //World
    //   zoom: 5, //Landmass/continent
    //   zoom: 10, // City
       zoom: 13, // City
    //   zoom: 15, //Streets
    //   zoom: 20, //Buildings
   });

  // const [categories_list, set_categories_list] = useState([]);
  const [categories_list, set_categories_list] = useState([
    {
        name: 'Cat1',
    },
    {
        name: 'Cat2',

    },
    {
        name: 'Cat3',

    },
    {
        name: 'Cat4',
    },
  ]);

  const [selected_category, update_selected_category] = useState("");
  
  const [selected_action, update_selected_action] = useState("ADD");

  const [loading_lists, set_loading_lists] = useState(true);
  const [error_message, set_error_message] = useState(null);

  const [original_list, set_original_list] = useState([]);
  const [filtered_list, update_filtered_list] = useState([]);
  const [selected_card, update_selected_card] = useState({});
  const [loading_profiles, set_loading_profiles] = useState(true);
 

  const states = {
    original_Locations_list,
    filtered_Locations_list,
    locations_filter_text, 
    locations_edited_flag, 
    locations_sort_order,
    locations_sort_by_category, 
    selected_location,
    initial_location,
    selected_map_location, 
    categories_list,
    selected_category,

    selected_action,
    loading_lists,
    error_message,

    original_list, //: robots_data,
    filtered_list, //: robots_data,
    selected_card, //: robots_data[0]
    loading_profiles
  };

  const actions = {
    set_original_Locations_list,
    update_Locations_filtered_list,
    set_locations_filter_text,
    set_locations_edited_flag,
    set_locations_sort_order,
    set_locations_sort_by_category,
    update_selected_location,
    update_initial_location,
    update_selected_map_location,
    set_categories_list,
    update_selected_category,

    update_selected_action,

    set_loading_lists,   
    set_error_message,    
    
    set_original_list,
    update_filtered_list,
    update_selected_card,
    set_loading_profiles

  };

  // The effect hook called useEffect is used to fetch the data from the API
  // The promise resolving happens with async/await.

  async function fetchData(data_url) {
    try {
      const web_list = await api.fetchAllProfiles3(data_url);

     // console.log(`MANAGER fetchData web_list:`);
     // console.table(web_list);

     // console.log(`MANAGER fetchData calling setWebList:`);
      if (web_list) {
        console.log(`MANAGER fetchData weblist valid:`);
       // console.table(web_list);

        set_original_list(web_list);
        update_filtered_list(web_list);
        update_selected_card(web_list[0]);
        set_loading_profiles(false);

        //console.log(`MANAGER fetchData web_list[0]:`);
        //console.log(web_list[0]);
      } else {
        console.log(`MANAGER fetchData weblist NOT valid:`);
        set_error_message(`MANAGER fetchData weblist NOT valid:`);
        /*
        set_original_list(robots_data);
        update_filtered_list(robots_data);
        update_selected_card(robots_data[0]);
        set_loading_profiles(false);
        */
      }
    } catch (err) {
      set_error_message(err.message);
    }
  }

  useEffect(() => {
    console.log(`useEffect calling fetchData`);
    fetchData(data_url);

    // We only want to fetch data when the component mounts.
    // That’s why you can provide an empty array as second argument
    // to the effect hook
    // to avoid activating it on component updates
    // but only for the mounting of the component.
  }, []);

  // WrapperDataManager adds a top Provider layer to ProfilesBrowser and all the tree ({children})
  return <Provider value={{ ...states, ...actions }}>{children}</Provider>;
};

export { WrapperDataManager, StateDataManager };
