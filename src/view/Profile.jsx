import React, { useContext } from "react";
import { StateDataManager } from "../stateProvider/DataManager";
//import Card from "./Card";

//import "../styles.css";
import styled from "styled-components";

// Function implementation
//--------------------------

const Profile = () => {
  // note that the object selected_card has to be in {} !!!
  // or else we get an empty object with id=1 ...
  const { selected_card } = useContext(StateDataManager);

  console.log(`Profile selected card init ${selected_card}`);
  console.log({ ...selected_card });

  if (selected_card) {
    console.table(selected_card);
  } else {
    console.log(`Profile selected card init null`);
  }

  let { id, first_name, last_name, country, email, description, avatar } = {
    ...selected_card
  };

  /*
  let {
    selected_robot: {
      id,
      first_name,
      last_name,
      email,
      country,
      description,
      avatar
    }
  } = useContext(RoboStore);

 
  avatar = avatar.replace("100x100", "300x300");
 */

  console.log(`Profile selected card init 3: `);
  console.log(`id ${id}`);
  console.log(`first_name ${first_name}`);
  console.log(`Profile avatar`);
  console.log(avatar);

  // const bigger_avater = avatar
  //   ? avatar.replace(`size=80x80`, `size=300x300`)
  //   : "https://robohash.org/eadoloresiste.jpg?size=80x80\u0026set=set1";

  return (
    <ProfileBox>
      <ProfileImageBox>
        <img
          src={
            avatar
              ? avatar.replace(`size=80x80`, `size=300x300`)
              : "https://robohash.org/eadoloresiste.jpg?size=80x80\u0026set=set1"
          }
          alt="avatr"
        />
      </ProfileImageBox>
      <ProfileDetailsBox>
        <ProfileTitle>
          {undefined === first_name ? "...Loading" : first_name}
          {undefined === first_name ? "..." : last_name}
        </ProfileTitle>
        <Line />
        <ProfileDetail mt="2rem">
          Id: {undefined === id ? "...Loading" : id}
        </ProfileDetail>
        <ProfileDetail>
          Country: {undefined === country ? "...Loading" : country}
        </ProfileDetail>
        <ProfileDetail>
          Email: {undefined === email ? "...Loading" : email}
        </ProfileDetail>
        <ProfileDescription mt="2rem">
          {undefined === description ? "...Loading" : description}
        </ProfileDescription>
      </ProfileDetailsBox>
    </ProfileBox>
  );
};

export default Profile;

const ProfileBox = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  align-items: center;
  /*flex:1;*/
`;

const ProfileImageBox = styled.div`
  /*flex:1;*/
  background: peachpuff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30rem;
  height: 30rem;
`;

const ProfileDetailsBox = styled.div`
  padding: 10px;
  font-family: "Expletus Sans";
  text-align: left;
  color: slategray;
  font-weight: 400;
`;

const ProfileTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: inherit;
  text-align: center;
`;

const Line = styled.span`
  display: block;
  width: 100%;
  border: none;
  height: 1px;
  margin-top: 2rem;

  background: -webkit-gradient(
    radial,
    50% 50%,
    0,
    50% 50%,
    200,
    from(midnightblue),
    to(Cornsilk)
  );
`;

const ProfileDetail = styled.h5`
  font-size: 2.2rem;
  font-weight: inherit;
  color: darkslateblue;
`;

const ProfileDescription = styled.p`
  font-family: "Raleway";
  font-size: 1.8rem;
  max-width: 40rem;
`;

/*

  return (
    <div className="profile-box">
      <div className="profile-image-box">
        <img
          src={
            avatar
              ? avatar.replace(`size=80x80`, `size=300x300`)
              : "https://robohash.org/eadoloresiste.jpg?size=80x80\u0026set=set1"
          }
          alt="avatr"
        />
      </div>

      <div className="profile-details-box">
          <h2 className="profile-title"> {first_name} {last_name} </h2>
        <span className="grad-line mt20" />      
        <h5 className="profile-detail mt20"> Id: {id}</h5>
        <h5 className="profile-detail"> Country: {country}</h5>
        <h5 className="profile-detail"> Email: {email}</h5>
        <p className="profile-description mt20"> {description}</p>
      </div>
    </div>
  );
*/
/*} */
/*
  return (
    <div className="card-item">
      <Card {...selected_card} />
    </div>
  );
*/
