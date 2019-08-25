import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { makeStyles } from '@material-ui/core/styles';
import marker from '@ajar/marker'; 


import {
    FormControl,
    InputLabel,
    Input,
    Button,
    TextField,
    MenuItem,
    Select,
    FormHelperText,
  } from "@material-ui/core";

import { StateDataManager } from "../../stateProvider/DataManager";

 
// const currencies = [
//     {
//       value: 'USD',
//       label: '$',
//     },
//     {
//       value: 'EUR',
//       label: '€',
//     },
//     {
//       value: 'BTC',
//       label: '฿',
//     },
//     {
//       value: 'JPY',
//       label: '¥',
//     },
//   ];
  
 
  const categories = [
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
  ];   

//=================================================================================
//                       Add Location view
//=================================================================================

const AddLocation = () => {

      const useStyles = makeStyles(theme => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
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
    
    const classes = useStyles();
 
    const { 
        categories_list, 
        set_categories_list 
    } = useContext(StateDataManager);
    const { 
        original_Locations_list, 
        set_original_Locations_list
    } =  useContext(StateDataManager);

     
    // const [values, setValues] =useState({
    //     name: 'Cat in the Hat',
    //     age: '',
    //     multiline: 'Controlled',
    //     currency: 'EUR',
    //   });
 
    const handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        set_new_location( {  [name]: value  } );
      }

    // Note: marker.obj prints in alphabetical order not actual order...
     const [new_location, set_new_location] = useState({
        id: 1,
        name: 'New Location',
        address: '',
        // coordinates: {lat: -389.76, lng: 45.12},
        coordinates: 'lat: -389.76, lng: 45.12', 
        category: categories[0].name,
      });   

    const [category, set_category] = useState(categories[0].name);
   
   // {() => update_selected_card(item)}>
   
    // const updateCategory = name => event => {
    // const updateCategory = () => event => {
    //     category2 =event.target.value;
    //     //set_new_location( { ...new_location, [event.target.name]: event.target.value }  );
    //     set_category(event.target.value);
     
    //     //marker.green(`updateCategory name`,name);
    //     marker.magenta(`updateCategory event.target.value `,event.target.value);
    //     marker.magenta(`updateCategory event.target.name `,event.target.name);
    //     marker.obj({...event.target } , `updateCategory event.target ` ); 
    //     marker.obj( new_location , `updateCategory Update new_location` );
    //     marker.blue(`updateCategory new_category `,category);

    //    };

/////
    //  onChange={handleChange('coordinates')}
    //
    // const handleChange = name => event => {
    //     setValues({ ...values, [name]: event.target.value });
    //     marker.obj({...event.target.value } , `event.target.value ` ); 
    //      marker.obj( values , `Update values` );
    // };

  const updateChange = name => event => {
    marker.green(`updateChange event.target ${event.target.name}= ${event.target.value}`);

    set_new_location( { ...new_location, [event.target.name]: event.target.value}  );
    marker.obj( new_location , `updateChange Update new_location` );
  };
 
  const contFunc = (event) => {
    marker.green( `contFunc event.target ${event.target.name} = ${event.target.value}` ); 
    set_new_location( ( {...new_location, [ event.target.name ]: event.target.value, } )  );
    marker.obj( new_location , `contFunc Update new_location` );
  }

  const handleChange = event => {
    try{   
     marker.green( `handleChange event.target ${event.target.name} = ${event.target.value}` );

     set_new_location( ( {...new_location, [ event.target.name ]: event.target.value, } )  );      
     
    }catch(err){
        marker.red(`handleChange caugt exception: ${err.message}`);
    }
   marker.obj( new_location , `handleChange Updated new_location` );

  };

  const handleSubmit = event  => {
    //alert('A name was submitted: ' + this.state.value);
    marker.obj( new_location , `handleSubmit Update new_locationr` );
    event.preventDefault();
  }

  marker.obj( new_location , `AddLocation current new_location` );
  
    return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 20,
            padding: 20
          }}
        >
          <form style={{ width: "50%" }} onSubmit={handleSubmit} >
            <h1>Add Location</h1>
  
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input 
                id="name" 
                name="name"
                type="text"  
                value={new_location.name} 
                onChange={handleChange} 
              />
            </FormControl>
  
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input 
                id="address" 
                name="address"
                type="text" 
               value={new_location.address} 
               onChange={handleChange}
              />
            </FormControl>
  
            {/* <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="address">Type address here</InputLabel>
              <Input id="address" multiline rows={5} />
            </FormControl> */}
  
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="coordinates">Coordinates</InputLabel>
              <Input 
                id="coordinates" 
                name="coordinates"
                type="text"  
                value={new_location.coordinates} 
                onChange={handleChange}
              />
            </FormControl>
   
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
                onChange={handleChange}

                inputProps={{
                    name: 'category',
                    id: 'category-simple',
                }}
                >
                {categories.map(item => (
                <MenuItem key={item.id} value={item.name}>
                    {item.name}
                </MenuItem>
                ))}
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>          

                {/* <InputLabel htmlFor="category2" >Category</InputLabel> */}            
{/* 
            <FormControl margin="normal" fullWidth>

                <TextField
                    id="select-category-native"
                    select
                    // label="Native select"
                    htmlFor="category"
                    name="category"
                    className={classes.textField}
                    // value={values.currency}
                    value={category}
                    required = "true"
                    // onChange={updateCategory('currency')}
                    // onChange={handleChange('currency')}
                    onChange={update_list( 'category' )}                     
                    // onChange={ updateCategory ('category')} 
                    SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                    }}
                    helperText="Please select your category"
                    margin="normal"
                    variant="outlined"
                    // variant="filled"
                >
                    {categories.map(item => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                    ))}
                </TextField>
            </FormControl> */}

            {/* <FormControl required>
              <InputLabel>Age</InputLabel>
              <Select value="" name="age" onChange={update_list( 'category'} >
                <MenuItem value=""><em>Please select your age ...</em></MenuItem>
                <MenuItem value={10}>Teens</MenuItem>
                <MenuItem value={20}>Twenties</MenuItem>
                <MenuItem value={30}>Thirties</MenuItem>
                <MenuItem value="40+">Fourties +</MenuItem>
              </Select>
              <FormHelperText>Some important helper text</FormHelperText>
            </FormControl>  */}

            {/* <FormControl className={classes.formControl} > */}
            {/* <FormControl className={classes.formControl} margin="normal" fullWidth>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                value={maxWidth}
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl> */}

{/* 
            <TextField
                id="outlined-select-currency-native"
                select
                label="Native select"
                className={classes.textField}
                value={values.currency}
                onChange={handleChange('currency')}
                SelectProps={{
                native: true,
                MenuProps: {
                    className: classes.menu,
                },
                }}
                helperText="Please select your currency"
                margin="normal"
                variant="outlined"
            >
                {currencies.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </TextField> */}


            <Button variant="contained" color="primary" size="medium" type="submit">
              Add
            </Button>
            {/* <button type="submit" >Add</button> */}
            {/* <button type="button"  onClick={reset}>  Clear Values   </button> */}
          </form>
        </div>
      );
  
}



export default AddLocation;


//const AddLocation = () => <h1>Create a new Location</h1>;

//const CreateBot = () => <h1 className="create">Create a new Bot!</h1>;
//export default CreateBot;



