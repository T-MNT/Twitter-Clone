import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfilData } from '../../feature/userProfil.slice';

const Follow = (props) => {
  const [followData, setFollowData] = useState([]);
  const [followersData, setFollowersData] = useState([]);

  const dispatch = useDispatch();
  const userProfil = useSelector((state) => state.userProfilReducer.profil);
  console.log(props);

  const getfollowData = () => {
    if (userProfil && userProfil.displayName) {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Profil/Follows.json`
        )
        .then((res) => setFollowData(Object.values(res.data)));
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${props.userToFollowPseudo}/Profil/Followers.json`
        )
        .then((res) => setFollowersData(Object.values(res.data)));
    }
  };

  const followHandler = () => {
    getfollowData();
    if (
      (userProfil && !userProfil.Follows) ||
      !Object.values(userProfil.Follows).includes(props.userToFollowPseudo)
    ) {
      axios.post(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${props.userToFollowPseudo}/Profil/Followers.json`,
        JSON.stringify(userProfil.displayName)
      );
      axios
        .post(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Profil/Follows.json`,
          JSON.stringify(props.userToFollowPseudo)
        )
        .then(
          axios
            .get(
              `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Profil.json`
            )
            .then((res) => dispatch(setUserProfilData(res.data)))
        )
        .then(getfollowData());
    } else {
      let reduxFollowData;
      if (userProfil && userProfil.Follows) {
        reduxFollowData = Object.values(userProfil.Follows);
      }

      let indexFollow = reduxFollowData.indexOf(props.userToFollowPseudo);
      let indexFollower = followersData.indexOf(userProfil.displayName);

      let newFollowData = reduxFollowData
        .slice(0, indexFollow)
        .concat(reduxFollowData.slice(indexFollow + 1));

      console.log(newFollowData);

      setFollowData(newFollowData);

      let newFollowersData = followersData.slice(0, indexFollower);
      setFollowersData(newFollowersData);
      //Follows//
      axios
        .put(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Profil/Follows.json`,
          newFollowData
        )
        .then(
          setTimeout(() => {
            axios
              .get(
                `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Profil.json`
              )
              .then((res) => dispatch(setUserProfilData(res.data)));
          }, 50)
        );
      //Followers//
      axios
        .put(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${props.userToFollowPseudo}/Profil/Followers.json`,
          newFollowersData
        )
        .then(getfollowData());
    }
  };

  const followButtonDisplayer = () => {
    if (
      userProfil &&
      userProfil.Follows &&
      Object.values(userProfil.Follows).includes(props.userToFollowPseudo)
    ) {
      return 'Ne plus suivre';
    } else return 'Suivre';
  };

  return (
    <div className="follow">
      <button className="blue-white-button" onClick={(e) => followHandler(e)}>
        {followButtonDisplayer()}
      </button>
    </div>
  );
};

export default Follow;
