import React, { Component, useState, useEffect, useContext } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
//import {MAP} from 'react-google-maps/lib/constants';

import { makeStyles, styled } from '@material-ui/core/styles';
import {  Box } from "@material-ui/core";

import marker from '@ajar/marker'; 

import { StateDataManager } from "../../stateProvider/DataManager";

const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);
// const url= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI';

const gMapURL= 
"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"

// const base_url = `https://maps.googleapis.com/maps/api/js`;
// const key = "AIzaSyDFYuZoAuUKiGaRRStQO2Yl0YP3utwdUNU";
// const mapKey = `AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI`;
// const url = `${base_url}&key=${mapKey}`;

//whenever changing .env, run: npm run start, in order for change to take effect
const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_URL= 
`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,geocoding&key=${google_maps_api_key}`;


//============================================================================
// withScriptjs enables avoididing stating the Google API Key in the HTML
// and hiding it in .env file
// You must remember to add to it REACT_APP_ prefix, and refresh the webbrowser 
// so that webpack will be updated with the added key.
//============================================================================

const Map = withScriptjs( withGoogleMap( (props) => {
  const { 
     lat, lng, zoom, setCoordinates, setAddress, onMapLoad
  } = props;
    
  //Gloobal context storage
 const { 
    initial_location,
    //selected_map_location, 
   // update_selected_map_location,
  } =  useContext(StateDataManager);

  const google = window.google;
 // console.log('Map google ', google);

  // const maps = google.maps;
  // console.log('Map maps\n', maps);

  // const mapEvents = google.maps.event;  
  // marker.obj(mapEvents, 'Map maps events\n' );

  console.log('Map props:\n', props);
  const [geocoder, set_geocoder] = useState(null);

  const [current_location, set_current_location] = useState(
    {
      address: initial_location.address ,
      // lat: -389.76, 
      // lng: 45.12, 
      lat: initial_location.lat , 
      lng: initial_location.lng , 
      //   zoom: 8,
      //   zoom: 1, //World
      //   zoom: 5, //Landmass/continent
      //    zoom: 10, // City
       zoom: 13, // City
      //   zoom: 15, //Streets
      //   zoom: 20, //Buildings
    }
  );

  // onComponentDidMount equiv
  //----------------------------------

  useEffect(() => {

    const { 
      lat, lng, zoom, setCoordinates
    } = props;

    console.log('Map useEffect ON MOUNT props:\n', props);

    // set_current_location(
    //   {
    //     address: '',
    //     lat: lat, 
    //     lng: lng, 
    //     zoom: zoom,         
    //    }
    // );    
    
   // console.log('Map useEffect ON MOUNT current_location:\n', current_location);

 
    const geocoder = new google.maps.Geocoder();
    set_geocoder(geocoder);
  
    marker.blue(`Map useEffect geocoder`);
    marker.obj( geocoder, 'geocoder');
    
    // We only want to fetch data when the component mounts.
    // That’s why you can provide an empty array as second argument
    // to the effect hook
    // to avoid activating it on component updates
    // but only for the mounting of the component.
    
  }, []);


  const onPositionChanged = (lat, lng) => {
    marker.blue(`Map onPositionChange:${lat} ${lng}`);
    const newLocation = new window.google.maps.LatLng(lat, lng);
  
    return (
      <Marker
        position={newLocation}
        title="Click to zoom" 
      />
    );
  }


  const getCoordinates = (event, setCoordinates, displayStr, geocoder) => {
      // const userPickedPos = this.map.getPosition();

    marker.obj(event, `Map getCoordinates onclick event\n`);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();    
    marker.blue(`Map getCoordinates  ${displayStr} lat ${lat} lng ${lng}`);

    
    const strAddress = geocodeGetAddress(event.latLng, setCoordinates, geocoder);

    

   // const place_details = event.xa.view.google.maps.places;//.getDetailes();
   // marker.obj(place_details, `Map getCoordinates place_details\n`);
    // console.log(`Map getCoordinates event.xa.view.google.maps\n`, event.xa.view.google.maps);
    // marker.magenta(`Map getCoordinates event.xa.view.google.maps.Data.\n`, event.xa.view.google.maps.Data);
   // marker.obj(event, `Map getCoordinates event\n`);
    //marker.obj( geocoder, 'Map getCoordinates geocoder');


  };


  const geocodeGetAddress = (latlng, setCoordinates,  geocoder) => {

    var strAddress ='';

    const lat = latlng.lat();
    const lng = latlng.lng();
   
    try {
      geocoder.geocode({'location': latlng}, (results, status) =>{
        if (status === 'OK') {
  
          if (results[0]) {
            marker.blue(`Map geocodeLatLng address: ` + results[0].formatted_address, );
            strAddress = results[0].formatted_address;
            //setAddress(strAddress);
            //update_selected_map_location( ( {...selected_map_location, address: strAddress, } )  );  
          } else {
            marker.blue('Map geocodeLatLng: No results found');
            strAddress ='Address Not Found'
            //setAddress('Address Not Found');
            //update_selected_map_location( ( {...selected_map_location,  address: 'Address Not Found', } )  );  
          }
        } else {
          marker.blue('MapgeocodeLatLng Geocoder: failed due to: ' + status);           
          strAddress = 'Address ERROR: ' + status ;
         // update_selected_map_location( ( {...selected_map_location,  address: 'Address ERROR: '+status, } )  );  
       }
         

          setCoordinates({ address: strAddress, lat: lat, lng: lng });
        // // setAddress(strAddress);
  
          marker.blue( `Map geocodeGetAddress  ${strAddress} ${lat} ${lng} \n` );
  
          set_current_location( { ...current_location, address: strAddress,  lat: lat, lng: lng });
        
      });
    }
    catch(err) {
        marker.e(`geocodeGetAddress error occured ${err.message}`);
        marker.obj(err, `geocodeGetAddress error occured `);
        strAddress = `Address ERROR: An exception occured`;

        
        setCoordinates({ address: strAddress, lat: lat, lng: lng });
        // // setAddress(strAddress);
  
          marker.blue( `Map geocodeGetAddress  ${strAddress} ${lat} ${lng} \n` );
  
          set_current_location( { ...current_location, address: strAddress,  lat: lat, lng: lng });
    }
    

   

  }

  marker.blue( `Map current_location  
  ${current_location.address} ${current_location.lat} ${current_location.lng}` );



   // using React refs to create a reference object to the GoogleMap

  return( 
    <GoogleMap
        // Here you have access to google.maps.Map object:
        ref={onMapLoad}  
       
        defaultZoom={zoom}
        defaultCenter={{ lat: lat, lng: lng }}
        
        onMapIdle={ ()=> { console.log('Map map is ready') } }
        onClick={ event => { 
          //console.log('Map click') ;
          getCoordinates(event, setCoordinates, "Click", geocoder);       
          //getCoordinates(event, setCoordinates, setAddress,"Click", geocoder);      
        } }  
              
      >
        { onPositionChanged(current_location.lat, current_location.lng) }
      </GoogleMap>
     );
    }


  ));
 

//============================================================================
//  Enveloping Component for the GoogleMap
//============================================================================

class LocationsMap extends Component {
  
   shouldComponentUpdate(nextProps, nextState) {
     log("LocationsMap shouldComponentUpdate this._map:",  this._map);
    return true;
  }

  componentDidMount() {
    const { lat, lng, zoom, setCoordinates } = this.props;
    //console.log('LocationsMap componentDidMount this.props \n', this.props);

    this.setState({
      center: { lat, lng },
      zoom: zoom,
      setCoordinates,
    });

    log("LocationsMap componentDidMount this._map:",  this._map);
  }
  
  // componentWillUnmount() {
  //   const { lat, lng, zoom, setCoordinates } = this.props;
  //   console.log('LocationsMap componentWillUnmount this.props \n', this.props);
  //   log("LocationsMap componentWillUnmount this._map:",  this._map);
  // }

  //==============================================================
  // get the GoogleMap ref
  //==============================================================

  onMapLoad = map => {
         //(map) => map.context[MAP]  
    this._map = map;

    console.log('LocationsMap onMapLoad this._map' ,this._map  ); 
    // if ( (this._map !== null) && (this._map !== 'undefined') ) {
    //       const myCenter = this._map.getCenter();
    //       console.log(myCenter, `LocationsMap onMapLoad myCenter`);
      
    //       // marker.obj(this._map.getCenter().toJSON(), `LocationsMap onMapLoad this._map.getCenter().toJSON() \n`); 
    //       marker.green('LocationsMap onMapLoad this._map.getZoom' , this._map.getZoom());   
    // } else{
    //   marker.red('LocationsMap onMapLoad this._map is null, s.t. happened ');
    // }

  }



  //--------------------------------------------
  render() {

    marker.red( `LocationsMap  ${this.props.address} ${this.props.lat} ${this.props.lng}` );
  
  //console.log(`google maps URL: ${GOOGLE_MAPS_URL}`);

    if ( (this._map !== null) && (this._map !== 'undefined') ) {    
      console.log('LocationsMap render this._map' , this._map);   
    } else{
      marker.red('LocationsMap render this._map is null ');
    }

    return (  
       <MapBox>
         {/* <div ref="myMap" className="map-box" > */}
        {/* <h1>Map should be here</h1> */}
        <Map
          // passing props to GoogleMap:
          ref="mapDiv"
          isMarkerShown={true}
          lat={this.props.lat}
          lng={this.props.lng}
          zoom={this.props.zoom}

          setCoordinates={this.props.setCoordinates}
          //setAddress={this.props.setAddress}
          onMapLoad = {this.onMapLoad}

          googleMapURL={GOOGLE_MAPS_URL}
          loadingElement={ <LoadingElementBox
            // style={{ height: `100%`, width:`80%` }} 
            /> }
          containerElement={ <ContainerElementBox 
            // style={{ height: `30rem`, width:`20rem` }}
             /> }
          mapElement={<MapElementBox id='googlemap' ref="myMap" 
          // style={{  height: `30rem`, width:`20rem` } }
           />  }

          onDoubleClick={this.handleMapChange}
          onMapIdle={ ()=> { console.log('LocationsMap map is ready') } }
   
        />

      </MapBox>

    );
  }
}


//==============================================================================================

const GoogleMapContainer = () => {
  // Global context states

  const {  
    original_Locations_list, 
    set_original_Locations_list,
    selected_map_location, 
    initial_location,
    // update_initial_location,
    update_selected_map_location,
  } =  useContext(StateDataManager);

  const [location, set_location] = useState({
    address: initial_location.address,
    lat: initial_location.lat, 
    lng: initial_location.lng, 
    
    //   zoom: 8,
    //   zoom: 1, //World
    //   zoom: 5, //Landmass/continent
    //   zoom: 10, // City
    zoom: 13, // City
    //   zoom: 15, //Streets
    //   zoom: 20, //Buildings
  });   



  const setUserPickedCoordinates = ({ address, lat, lng }) => {
    marker.red(`GoogleMapContainer setUserPickedCoordinates:  lat ${lat} lng  ${lng}`); 

    set_location({ ...location, address: address, lat: lat, lng: lng, });
    update_selected_map_location({ ...selected_map_location, address: address, lat: lat, lng: lng ,});
  };

  const setUserPickedAddress = (str) => {
    marker.red(`GoogleMapContainer setUserPickedAddress:  address ${str}`); 
    set_location({ address: str , });
    update_selected_map_location({  address: str, });
  };

 // Update map according to selected_map_location changes
  // useEffect(() => {

  //   set_location( ( {...location, 
  //     address: selected_map_location.address, 
  //     lat: selected_map_location.lat, 
  //     lng: selected_map_location.lng, 
  //   } )  );  

  //   marker.red(`GoogleMapContainer useEffect location: lng  ${location.lng}`); 
  //   marker.red(`GoogleMapContainer useEffect selected_map_location.lng:  ${location.lng}`);
  
  // }, [selected_map_location]);


  // Equiv to On Mount
  useEffect(() => {

    set_location( ( {...location, 
       address: selected_map_location.address, 
       lat: selected_map_location.lat, 
       lng: selected_map_location.lng, 
     } )  );  
  
   }, []);


   marker.red(`GoogleMapContainer location: 
   address  ${location.address} lat  ${location.lat} lng  ${location.lng}`); 

   marker.red(`GoogleMapContainer selected_map_location: 
   address  ${selected_map_location.address} 
   lat ${selected_map_location.lat} lng ${selected_map_location.lng}`);

 
  return (
    <AppBox>
    
      {
      // <LocationsGoogleMap 
      }
      <MapTitleBox>
        { 
        //<MapTitle>Location map</MapTitle> 
        }
        <h1>Location map</h1>
      </MapTitleBox>

      <LocationsMap
        lat={location.lat}
        lng={location.lng}
        zoom={location.zoom}
        setCoordinates={setUserPickedCoordinates}
        //setAddress={setUserPickedAddress}
      />
      <MapDetailsBox>
        <MapDetails>lat:     {location.lat}</MapDetails>
        <MapDetails>lng:     {location.lng}</MapDetails>
        <MapDetails>Address: {location.address}</MapDetails>
      </MapDetailsBox>
    </AppBox>
  );
  

}


export {GoogleMapContainer, LocationsMap} ;


//==============================================================================================
//         Local styling
//==============================================================================================

const AppBox = styled('div')({
  height: '70vh',
  /* height: 85vh; */
  minWidth: '35rem',
  maxWidth:'37rem',
  
  //marginRight: 20,
  //paddingRight: 20,

  borderRadius: '0.4rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
  boxShadow: '0 0.2rem 0.8rem DimGrey',

  borderradius: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', 
  justifyContent: 'flex-start',   
}); 

const LoadingElementBox= styled('div')({
  // height: `100%`, 
  // width:`100%` , //80%
   margin:0,
   padding:0,

   display: 'flex',     
   flexdirection:'row',
   flaxbasis: '100%', 
   flexwrap: 'wrap', 
   justifyContent: 'center',
   alignitems: 'center',
}); 

const ContainerElementBox= styled('div')({
//  height: `30rem`, 
//  width:`27rem`, 
  margin:0,
  padding:0,
   
  display: 'flex',     
  flexDirection:'row',
  flexBasis: '100%', 
  flexWrap: 'wrap', 
  justifyContent: 'center',
  alignItems: 'center',
}); 

const MapElementBox= styled('div')({
  // height: `30rem`, 
  // width:`25rem`,
  height: `35rem`, 
  width:`32rem`,
  maxWidth:`32rem`,
  margin:0,
  padding:0,
}); 

//const MapBox = styled('div')({
const MapBox = styled(Box)({
    display: 'flex',
    flexdirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0, //20
    //padding: 20
    padding: '1.5rem',
    //paddingRight: 20, // '15px'
  });

const MapTitleBox = styled('div')({
  marginLeft:'5rem',
  paddingLeft: 30, //'1rem',
  marginTop: 20,
  paddingTop: 20,

  display: 'flex',
  flexdirection:'column',
  //width:`20rem`,
  justifyContent: 'center',
});  

const MapTitle = styled('h2')({
  //width:`20rem`,
  //fontSize: '1.75rem',
  fontWeight: 'inherit',
  textAlign: 'center',  
}); 

const MapDetailsBox = styled('div')({
 // width:`20rem`,
  marginLeft:'10px',
  paddingLeft: '20px',

  display: 'flex',     
  flexDirection:'column',
 flexBasis: '100%', 
  flexWrap: 'wrap', 
  justifyContent: 'center',
  //alignItems: 'center',
  // fontFamily: 'Expletus Sans',
 
  color: 'slategray',
  fontWeight: 400,
  
}); 

const MapDetails = styled('h5')({
  fontSize: '1.1rem',
  // font-size: '2.25rem', 
  fontWeight: 'inherit',
  color: 'darkslateblue',
  textAlign: 'left',  
}); 



