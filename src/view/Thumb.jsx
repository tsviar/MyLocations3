import React from "react";
import styled from "styled-components";

const Thumb = ({ image_url }) => {
  return (
    <div>
      <Image src={image_url} alt="" />
    </div>
  );
};
export default Thumb;

const Image = styled.img`
  /* height: 10rem;
  width: 10rem; */
  height: 5rem;
  width: 5rem;
  font-size: 0.4rem;
  /*border: #004141 solid 4px;*/
  border-radius: 50%;
  /*padding: 10px;*/
  background-color: darksalmon;
  transition: box-shadow 150ms, margin 150ms, padding 150ms;

  &:hover {
    box-shadow: 0 0.4rem 1.5rem DimGrey;
    margin-bottom: 3rem;
    padding-bottom: 1rem;
  }
`;

/*
 return (
    <div className="thumb-box">
      <img className="thumb" src={image_url} alt="" />
    </div>
  );
 */
