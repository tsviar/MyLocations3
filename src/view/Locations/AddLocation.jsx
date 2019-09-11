import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from '@material-ui/core/styles';
import marker from '@ajar/marker'; 


import {
    FormControl,
    FormControlLabel,
    InputLabel,
    Input,
    Button,
    TextField,
    MenuItem,
    Select,
    FormHelperText,
    Box,
    Tooltip ,
  } from "@material-ui/core";

import { StateDataManager } from "../../stateProvider/DataManager";
import { wrap } from "module";

  
 
//   const categories = [
//     {
//         name: 'Cat1',
//     },
//     {
//         name: 'Cat2',

//     },
//     {
//         name: 'Cat3',

//     },
//     {
//         name: 'Cat4',
//     },
//   ];   

  const MIN_COORDINATES = -5000.000000;
  const MAX_COORDINATES =  5000.000000;
//=================================================================================
//                       Add Location view
//=================================================================================

const AddLocation = () => {

    // general apearence rules
    const classes = useStyles();
 
    // Global context states
    const { 
        categories_list, 
        original_Locations_list, 
        set_original_Locations_list,
        selected_map_location, 
        update_selected_map_location,
    } =  useContext(StateDataManager);

   
    // Local state

    // Note: marker.obj prints in alphabetical order not actual order...
    const [new_location, set_new_location] = useState({
        id: original_Locations_list.length+1,
        name: '',
        address: '',
        // coordinates: {lat: -389.76, lng: 45.12},
        coordinates_lat: -389.76, 
        coordinates_lng: 45.12, 
        category: categories_list[0].name,
      });   

    const [errors, set_errors] = useState({
        name: '',
        address: '',
        coordinates_lat: '',
        coordinates_lng: '', 
        category: '',        
      });   

    const [validation_success, set_validation_success] = useState(true);

   

  /*
    
    Choose onChange(): If you need latest state immediately after input change, for example:
    Search suggestion after each input (like Google search box)
    Then Validating input after every change

    Choose onBlur(): If you only need the latest state at the end of final input, for example:
    Every change triggers a fetch event that checks if entered username or email exists

    Your user filled all 3 registration inputs (name, password, email), but after the last   email input s/he directly click the send button (which is fired your signup method without updated email state). Since setState is asynchronous and not updated email state yet, you   might have problems about null email inputs.

    So, my unofficial suggestion is that, use onChange whenever you possible, use onBlur whenever you need.
  */


  // Validating input after every change
  const handleChange = event => {
    try{   
    const { name, value } = event.target; // destructure properties
    marker.green( `handleChange event.target ${name} = ${value}` );

    // do not disable it or u wont see any thing on screen and on related field
    set_new_location( ( {...new_location, [ name ]: value, } )  );      
     
    }catch(err){
        marker.red(`handleChange caugt exception: ${err.message}`);
    }
   marker.obj( new_location , `handleChange Updated new_location` );

  };


  const findIfNameExists = (value) => {
    marker.blue(`findIfNameExists value= ${value}`);   
    
    const names_list = original_Locations_list.map( item => item.name );
    marker.green( `handleBlur list: ${names_list}` );
    const found1 =  names_list.includes(value); //('Demo Location');
    
    marker.blue(`find result ${found1}`);
    return found1;
  };

  //      Handle exit from field
  //------------------------------------
  const handleBlur = event => {

    try{   
        let error_msg = '';

        const { name, value } = event.target; // destructure properties
        marker.magenta( `handleBlur 1 event.target ${name} = ${value}` );
        
        let validValue = ( (value !== ``) && (value !== 'undefined') && (value !== null) );  
        marker.magenta( `handleBlur 2 event.target ${name} ${value}` );
        
        if( (name === 'coordinates_lat') || (name === 'coordinates_lng') ) {
            marker.red(`handleBlur 3 field ${name} ${value} `);   

            if ( (value <= MIN_COORDINATES )  || (value >= MAX_COORDINATES ) ) {
                validValue = false;
                set_new_location( ( {...new_location, [ name ]: '', } )  );

                marker.red(`handleBlur 4 ${name}  validValue ${validValue} `);   
            }
        }

        let found = false;
        marker.red(`handleBlur 5 found ${found} `);   
        marker.blue( `handleCBlur 6  ${name} = ${value}` );  

         // handlse name validation
        if ( validValue && (name === 'name') ) {
            marker.magenta( `handleCBlur 7  ${name} = ${value}` );           
            
            // find if name exists in locations list
            marker.obj( original_Locations_list , `handleBlur original_Locations_list ` );

            var exists = ( element) => {
                marker.obj( element , `element ` );
                marker.green( `value: ${value}` );
                // checks whether an element is even
                return element.name  === value;
              };
            
            found =  original_Locations_list.some( exists);
            marker.green( `handleBlur SOME nameFound: ${found}` );

           
            // found = findIfNameExists(value);
            // marker.red(`handleBlur found after search ${found} `);   
            
            if (found ){
                marker.red(`Location name ${value} already exists. `);  

                error_msg = `Location name ${value} already exists. `;
                //set_errors({...errors, [ name ]: `Location name ${value} already exists`}); 
                 set_new_location( ( {...new_location, [ name ]: '', } )  );
            }     
            else{
                marker.red(`Location name ${value} does not exist. `);  
                error_msg = '';              
                //set_errors({name: ``});                
            }
        }

        if ( !validValue  ) {
            error_msg = 'Empty field or Invalid value. ';
            marker.red(`error_msg ${error_msg} `);    
       }

        marker.red(`exists ${found} `);     
        marker.red(`handleBlur 2  validValue ${validValue} `);   

        if (!found && validValue) {
            marker.green(`!found && validValue ${found} ${validValue}`); 
            // do not disable it
            set_new_location( ( {...new_location, [ name ]: value, } )  ); 
            error_msg = '';   
        }     
        marker.red(`set_errors error_msg ${error_msg} `);  
        set_errors({...errors, [ name ]:  error_msg }); 
     
    }catch(err){
        marker.red(`handleCBlure caugt exception: ${err.message}`);
    }
   marker.obj( new_location , `handleBlur Updated new_location` );
   marker.obj( errors, `handleBlur Updated errors` );

  };

  
 //  Form validateion
 //--------------------------------   
 
const validateField = field => {
    let validName = ( (new_location[field] !== ``) && (new_location[field] !== 'undefined') && (new_location[field] !== null) );
    
    if( (field === 'coordinates_lat') || (field === 'coordinates_lng') ) {
        validName = validName && (!Number.isNaN(new_location[field]) )
                    && (new_location[field] >= MIN_COORDINATES )
                    && (new_location[field] <= MAX_COORDINATES ) ;
    }


    if (!validName) {
        set_errors({...errors, [ field ]:`Location ${field} is empty.`}); 
    }

    return validName;
 }
 
 const validateForm = () => {  
   try{

    const validName = validateField('name');
    const validAddress = validateField('address'); 
    const validLat = validateField('coordinates_lat' );
    const validLng  = validateField('coordinates_lng' );
    const validCategory  = validateField('category' );

    marker.obj( errors , `validateForm errors 1` );

    if (validName && validAddress && validLat && validLng && validCategory
        && !errors.name && !errors.address && !errors.coordinate_lat 
        && !errors.coordinate_lng && !errors.category) {

            set_validation_success(true);
            marker.green( `validateForm validation_success ${validation_success}` );
            marker.obj( new_location , `validateForm new_location` );
            marker.obj( errors , `validateForm errors 2` );                                             
    }  

    }catch(err){
        marker.red(`validateForm caugt exception: ${err.message}`);
    }
   marker.obj( new_location , `validateForm Updated new_location` );
  }

  const handleSubmit = event  => {
    event.preventDefault() ;// prevent form post

    // handle add here
    //----------------------------
    //alert('A name was submitted: ' + this.state.value);

    validateForm();

    marker.obj( new_location , `handleSubmit Update new_locationr` );
     set_original_Locations_list(...original_Locations_list, new_location);
  }

  marker.obj( new_location , `AddLocation current new_location` );
  
    return (
        <FormBox>
          {/* <form style={{ width: "50%" }} onSubmit={handleSubmit} > */}
          <NewLocationForm  onSubmit={handleSubmit} >
            <h1>Add a new Location</h1>
  
            <FormControl required margin="normal" fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input 
                id="name" 
                name="name"
                type="text"  
                value={new_location.name} 
                placeholder="e.g: My New cool location 3"
                onChange={handleChange} 
                onBlur={handleBlur}
              />
            </FormControl>
            {errors.name &&  <ErrorText>{errors.name}</ErrorText>}

            <FormControl required margin="normal" fullWidth>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input 
                id="address" 
                name="address"
                type="text" 
                value={new_location.address} 
                placeholder="e.g: myStreet 3, New York"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
            {errors.address &&  <ErrorText>{errors.address}</ErrorText>}

  
            {/* <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="address">Type address here</InputLabel>
              <Input id="address" multiline rows={5} />
            </FormControl> */}
  
            {/* <FormControl margin="normal" fullWidth> */}
              {/* <CoordinatesInputLabel htmlFor="coordinates">Coordinates</CoordinatesInputLabel> */}

              <CoordinatesBox>
                <CoordinatesBoxLabel> Coordinates </CoordinatesBoxLabel>
                 <CoordinatesInnerBox> 
                {/* <fieldset width="100%"> */}
                    <FormControl required margin="normal" width="50%">
                        <InputLabel htmlFor="coordinates_lat">Latitude </InputLabel>
                        <CoordinatesInput 
                            id="coordinates_lat" 
                            name="coordinates_lat"
                            type="number"  
                            min="MIN_COORDINATES"
                            max="MAX_COORDINATES"
                            value={new_location.coordinates_lat} 
                            placeholder="-345.1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                        </FormControl>
                        {errors.coordinates_lat &&  <ErrorText>{errors.coordinates_lat}</ErrorText>}

                        <FormControl required margin="normal" width="50%">
                        <InputLabel htmlFor="coordinates_lng" >Longitude</InputLabel>

                        <CoordinatesInput 
                            id="coordinates_lng" 
                            name="coordinates_lng"
                            type="number"  
                            min="MIN_COORDINATES"
                            max="MAX_COORDINATES"
                            value={new_location.coordinates_lng} 
                            placeholder="156.76"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                    </FormControl>  
                    {errors.coordinates_lng &&  <ErrorText>{errors.coordinates_lng}</ErrorText>}

                {/* </fieldset>       */}
                </CoordinatesInnerBox>
            </CoordinatesBox>

            <Tooltip title={toolTipText} className={classes.tooltip} >
            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="category">Category</InputLabel>
              {/* <Input id="category" type="text" /> */}
            {/* </FormControl>

            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="acategory">Category</InputLabel> */}
                <Select  
                id= 'category-simple'
                name= 'category'             
                value={new_location.category}
                placeholder="Pick a Category from the list"
                onChange={handleChange}

                // inputProps={{
                //     name: 'category',
                //     id: 'category-simple',
                // }}
                >
                {categories_list.map(item => (
                <MenuItem key={item.name} value={item.name}>
                    {item.name}
                </MenuItem>
                ))}
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>required</FormHelperText>
            </FormControl>                  
            </Tooltip>

            {errors.category &&  <ErrorText>{errors.category}</ErrorText>}   


           <SubmitBox>
                <Button 
                disabled={
                    errors.name || errors.address || errors.coordinates_lat 
                    || errors.ooordinates_lng || errors.category 
                    || validation_success === false
                } 
                variant="contained" color="primary" size="medium" margin= "40px" type="submit"   >
                Add
                </Button>
            </SubmitBox>
            {/* <button type="submit" >Add</button> */}
            {/* <button type="button"  onClick={reset}>  Clear Values   </button> */}
            {/* props: {
                color?: PropTypes.Color;
                disableFocusRipple?: boolean;
                fullWidth?: boolean;
                href?: string;
                size?: "small" | "medium" | "large";
                variant?: "text" | "outlined" | "contained";
            */}
          </NewLocationForm>
        </FormBox>
      );
  
}



export default AddLocation;

////  Styling //////
const toolTipText = `Select an existing category from the list`;

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: "sm",
    },
    tooltip:{
        fontSize: 10,
        lineHeight: 16,
        heigt: 17,
        // marginTop: 2,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
       
      },
      formControlLabel: {
        marginTop: theme.spacing(1),        
      },
}));


const FormBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    margin: 20,
    padding: 20
}); 

const NewLocationForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
    // width: "50%",

});

const CoordinatesBoxLabel = styled(InputLabel)({
    fontSize: 3,
    fontWeight: 'inherit',
    textAlign: 'center',
    color:'inherit',
    });

const CoordinatesBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    marginTop: 21,    
    paddingTop: 10,    
    paddingBottom: 3,
    width: "100%",

    //borderStyle: 'solid',
    //borderColor:'#d1e0e0',

    //font-family: "Expletus Sans";
    textAlign: "left",
    // color: "slategray",

    // fontWeight: 400,
});

const CoordinatesInnerBox = styled(Box)({

    display: 'flex',
    //flexFlow:['noWrap','noWrap','wrap'], 
    flexFlow:'wrap', 
    // flexDirection: ["row", 'row', 'column'],
    flexDirection: 'column',
    justifyContent: 'space-even',

    marginTop: 12,
    marginLeft: 20,

    paddingleft: 20,
    paddingTop: 5,
    paddingBottom: 3,

    // width: "100%",
    width:[1, 1, 1/2],
    maxWidth:"sm",
    //font-family: "Expletus Sans";
    textAlign: "left",
    color: "slategray",
    // fontWeight: 400,

    
});

const CoordinatesInput = styled(Input)({
    marginRight: 10,
    // paddingTop: 5,
     paddingleft: 25,
    paddingRight: 25,
    //flexGrow:0,
    // flexBasis:['40%', '40%', '100%'],
    //width:[1/2, 1/2, 1],
    maxWidth:"xl",
  });

  const CoordinatesInputLabel = styled(InputLabel)({
    marginRight: 10,
    paddingRight: 15,
  });

  const SubmitBox = styled('p')({
    display: 'flex',
    justifyContent:"center",
    marginTop: 30,
    //marginLeft: 50,
    paddingTop: 15,
  });

  const ErrorText = styled('h4')({
    display: 'flex',
    justifyContent:"left",
    marginTop: 3,
    //marginLeft: 50,
    paddingTop: 5,
    color: 'red',
    textAlign: 'left',
  });

//const AddLocation = () => <h1>Create a new Location</h1>;

//const CreateBot = () => <h1 className="create">Create a new Bot!</h1>;
//export default CreateBot;



