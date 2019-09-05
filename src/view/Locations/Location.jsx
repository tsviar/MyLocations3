import React from "react";
import Thumb from "../Thumb";
import styled from "styled-components";

const Location= ({ name, address, coordinates_lat, coordinates_lng, category }) => {
  // console.log('name:',name)
  //	console.log('props:',props)
  // coordinates = {
  //   lat: -34.397,
  //   lng: 150.644
  // };

  return (
    <Box>
      <TextsBox>
        <Title>
          {name} ( Category: {category} )
        </Title>
        <MsgText>Address: {address} </MsgText>
        <MsgText>Coordinates: lat {coordinates_lat}, lng {coordinates_lng})</MsgText>
      </TextsBox>
    </Box>
  );
};

export default Location;

const Box = styled.div`
  padding: 2rem 2.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: paleturquoise;
    ${Image} {
      box-shadow: 0 0.4rem 1.5rem DimGrey;
      margin-bottom: 3rem;
      padding-bottom: 1rem;
    }
  }

  &:hover {
    background: paleturquoise;
  }
  &:active {
    background: skyblue;
    color: white;
  }
`;

const TextsBox = styled.div`
  padding-left: 2.8rem;
`;

const Title = styled.h1`
  font-family: "Expletus Sans";
  text-align: left;
  /* font-size: 2.8rem; */
  font-size: 1.4rem;
`;
const MsgText = styled.p`
  font-family: "Raleway";
  font-size: 1.0rem;
  /* font-size: 1.4rem; */
  max-width: 35rem;
  
`;

