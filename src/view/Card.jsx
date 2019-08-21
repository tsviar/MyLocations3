import React from "react";
import Thumb from "./Thumb";
import styled from "styled-components";

const Card = ({ first_name, country, description, avatar }) => {
  // console.log('first_name:',first_name)
  //	console.log('props:',props)
  return (
    <Box>
      <Thumb image_url={avatar} />
      <Image src={avatar} /> {/*alternative to Thumb */}
      <TextsBox>
        <Title>
          {first_name} from {country}
        </Title>
        <MsgText>{description}</MsgText>
      </TextsBox>
    </Box>
  );
};

export default Card;

const Image = styled.img`
  /* height: 10rem;
  width: 10rem; */
  height: 5rem;
  width: 5rem;
  /*border: #004141 solid 4px;*/
  border-radius: 50%;
  /*padding: 10px;*/
  background-color: darksalmon;
  transition: box-shadow 150ms, margin 150ms, padding 150ms;
`;

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
  font-size: 0.7rem;
  /* font-size: 1.4rem; */
  max-width: 35rem;
`;

/*
return (
    <div className="card">
      <Thumb image_url={avatar} />
      <div className="texts-box">
        <h1 className="card-title paragraph">
          {first_name} from {country}
        </h1>
        <p className="card-msg">{description}</p>
      </div>
    </div>
  );
 */
