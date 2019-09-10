import React, { Component, useState, useEffect} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {MAP} from 'react-google-maps/lib/constants';

import marker from '@ajar/marker'; 


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


// `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI`;

// `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${google_maps_api_key}`;


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
      address: '',
      // lat: -389.76, 
      // lng: 45.12, 
      lat: 31.776847698411576, 
      lng: 35.20543098449707, 
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

    set_current_location(
      {
        address: '',
        lat: lat, 
        lng: lng, 
        zoom: zoom,         
       }
    );    
    
    console.log('Map useEffect current_location:\n', current_location);
    console.log('Map useEffect props:\n', props);
 
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
    marker.magenta(`Map onPositionChange:${lat} ${lng}`);
    const newLocation = new window.google.maps.LatLng(lat, lng);
    // [NOTE]: try using the panTo() from googleMaps to recenter the map ? but don't know how to call it.

    return (
      <Marker
        position={newLocation}
        title="Click to zoom" 
      />
    );
  }


  const getCoordinates = (event, setCoordinates, setAddress, displayStr, geocoder) => {
      // const userPickedPos = this.map.getPosition();

    marker.magenta(`Map getCoordinates onclick event\n`, event);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    marker.magenta(`Map getCoordinates  ${displayStr} lat ${lat} lng ${lng}`);

    set_current_location( { lat: lat, lng: lng });
    marker.magenta(current_location, `Map getCoordinates current_locationn\n` );

    setCoordinates({ lat: lat, lng: lng });
    
    const place_details = event.xa.view.google.maps.places;//.getDetailes();
    marker.obj(place_details, `Map getCoordinates place_details\n`);

    // console.log(`Map getCoordinates event.xa.view.google.maps\n`, event.xa.view.google.maps);

    // marker.magenta(`Map getCoordinates event.xa.view.google.maps.Data.\n`, event.xa.view.google.maps.Data);

    marker.obj(event, `Map getCoordinates event\n`);
    marker.obj( geocoder, 'Map getCoordinates geocoder');

    geocodeGetAddress(event.latLng, setAddress, geocoder);

  };


  const geocodeGetAddress = (latlng, setAddress, geocoder) => {

    geocoder.geocode({'location': latlng}, (results, status) =>{
      if (status === 'OK') {
        if (results[0]) {
          marker.red(`Map geocodeLatLng address: ` + results[0].formatted_address, );
          setAddress(results[0].formatted_address);
        } else {
          marker.red('Map geocodeLatLng: No results found');
          setAddress('Address Not Found');
        }
      } else {
        marker.e('MapgeocodeLatLng Geocoder: failed due to: ' + status);           
        setAddress('Address ERROR: '+status);
     }
    });

  }


   // using React refsto create a reference object to the GoogleMap

  return( 
    <GoogleMap
        // Here you have access to google.maps.Map object:
        ref={onMapLoad}  
       
        defaultZoom={zoom}
        defaultCenter={{ lat: lat, lng: lng }}
        
        onMapIdle={ ()=> { console.log('Map map is ready') } }
        onClick={ event => { 
          console.log('Map click') ;
          getCoordinates(event, setCoordinates, setAddress,"Click", geocoder);        
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
    log("shouldComponentUpdate >>>>");
    // log("this.props:", this.props);
    // log("this.state:", this.state);
    // log("nextState:", nextState);
    // log("nextProps:", nextProps);
    // log("<<<< shouldComponentUpdate");
    // this.map.setCenter({ lat: nextProps.lat, lng: nextProps.lng });
    // this.map.setZoom(nextProps.zoom);

    // this.marker.setMap(null);
    // this.marker.setPosition({ lat: nextProps.lat, lng: nextProps.lng });

    // this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });

    return false;
  }


  componentDidMount() {
    const { lat, lng, zoom, setCoordinates } = this.props;
    console.log('LocationsMap componentDidMount this.props \n', this.props);

    this.setState({
      center: { lat, lng },
      zoom: zoom,
      setCoordinates,
    });
  }
  
  //==============================================================
  // get the GoogleMap instance
  //==============================================================

  onMapLoad = map => {
         //(map) => map.context[MAP]  
    this._map = map;

    marker.obj(this._map, 'LocationsMap onMapLoad this._map'  ); 
    marker.obj(this._map.getCenter().toJSON(), `LocationsMap onMapLoad this._map.getCenter().toJSON() \n`); 
    marker.green('LocationsMap onMapLoad this._map.getZoom' , this._map.getZoom());

  }

  //--------------------------------------------
  render() {

  //console.log(`google maps URL: ${GOOGLE_MAPS_URL}`);

    return (
      <div
        // ref="myMap"
        className="map-box">

        <Map
          // passing props to GoogleMap:
          ref="mapDiv"
          isMarkerShown={true}
          lat={this.props.lat}
          lng={this.props.lng}
          zoom={this.props.zoom}

          setCoordinates={this.props.setCoordinates}
          setAddress={this.props.setAddress}
          onMapLoad = {this.onMapLoad}

          googleMapURL={GOOGLE_MAPS_URL}
          loadingElement={ <div style={{ height: `100%` }} /> }
          containerElement={ <div style={{ height: `400px` }} /> }
          mapElement={<div id='googlemap' ref="myMap" style={{ height: `100%` }} />  }

          onDoubleClick={this.handleMapChange}
          onMapIdle={ ()=> { console.log('LocationsMap map is ready') } }
   
        />

      </div>
      // <div
      //   ref="myMap"
      //   className="map-box"
      //   // onClick={() => this.getCoordinates(event)}
      // />
    );
  }
}


export default LocationsMap ;