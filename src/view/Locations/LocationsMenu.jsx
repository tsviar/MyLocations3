import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LocationsMenu = () => (
  <Nav>
    <li>
      <StyledLink to="/locations">View</StyledLink>
    </li>   
     <li>
      <StyledLink to="/locations/add">Add</StyledLink>
    </li>
    <li>
      <StyledLink to="/locations/edit">Edit</StyledLink>
    </li>
    <li>
      <StyledLink to="/locations/remove">Remove</StyledLink>
    </li>

  </Nav>
);

export default LocationsMenu;

//Extending React Link
const StyledLink = styled(Link)`
  color: mintcream;
`;

const Nav = styled.ul`
  display: flex;
  list-style-type: none;
  font-family: "Yanone Kaffeesatz";
  font-weight: 400;
  /* font-size: 2.8rem; */
  font-size: 1.2rem; 
  width: 10rem;
  justify-content: space-between;
`;
