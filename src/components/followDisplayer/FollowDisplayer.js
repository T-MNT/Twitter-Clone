import React from 'react';
import Follow from '../followButton/Follow';
import NavigationItem from '../../pages/layout/navigation/navigationItem/NavigationItem';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const FollowDisplayer = (props) => {
  const [user, setUser] = useState({});
  const userProfil = useSelector((state) => state.userProfilReducer.profil);

  useEffect(() => {
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${props.userDisplayName}/Profil.json`
      )
      .then((res) => setUser(res.data));
  }, [props.userDisplayName]);

  const followFollowerDisplayer = () => {
    ////////////PROFIL DE L'UTILISATEUR FOLLOW////////////////
    if (
      userProfil &&
      userProfil.displayName &&
      userProfil.Follows &&
      props.param === 'Follow' &&
      userProfil.displayName === props.userDisplayName
    ) {
      let follows;
      if (Array.isArray(userProfil.Follows)) {
        follows = userProfil.Follows;
      }
      if (!Array.isArray(userProfil.Follows)) {
        follows = Object.values(userProfil.Follows);
      }
      return follows.map((follow) => (
        <li>
          <div className="author-pic" />
          <NavigationItem to={`/profil/!${follow}`}>
            <h5 onClick={() => props.setActive(false)}>{follow}</h5>
          </NavigationItem>
          <Follow userToFollowPseudo={follow} />
        </li>
      ));
    }
    ////////////PROFIL DE L'UTILISATEUR FOLLOWERS////////////////
    if (
      userProfil &&
      userProfil.displayName &&
      userProfil.Followers &&
      props.param === 'Follower' &&
      userProfil.displayName === props.userDisplayName
    ) {
      let followers;
      if (Array.isArray(userProfil.Followers)) {
        followers = userProfil.Followers;
      }
      if (!Array.isArray(userProfil.Followers)) {
        followers = Object.values(userProfil.Followers);
      }
      return followers.map((follower) => (
        <li>
          <div className="author-pic" />
          <NavigationItem to={`/profil/!${follower}`}>
            <h5 onClick={() => props.setActive(false)}>{follower}</h5>
          </NavigationItem>
          <Follow userToFollowPseudo={follower} />
        </li>
      ));
    }
    ////////////PROFIL D'UN AUTRE UTILISATEUR FOLLOW/////////////
    if (
      userProfil &&
      userProfil.displayName &&
      user.Follows &&
      props.param === 'Follow' &&
      userProfil.displayName !== props.userDisplayName
    ) {
      let follows;
      if (Array.isArray(user.Follows)) {
        follows = user.Follows;
      }
      if (!Array.isArray(user.Follows)) {
        follows = Object.values(user.Follows);
      }
      return Object.values(user.Follows).map((follow) => (
        <li>
          <div className="author-pic" />
          <NavigationItem to={`/profil/!${follow}`}>
            <h5 onClick={() => props.setActive(false)}>{follow}</h5>
          </NavigationItem>
          <Follow userToFollowPseudo={follow} />
        </li>
      ));
    }
    ////////////PROFIL D'UN AUTRE UTILISATEUR FOLLOWERS/////////////
    if (
      userProfil &&
      userProfil.displayName &&
      user.Followers &&
      props.param === 'Follower' &&
      userProfil.displayName !== props.userDisplayName
    ) {
      let followers;
      if (Array.isArray(user.Followers)) {
        followers = user.Followers;
      }
      if (!Array.isArray(user.Followers)) {
        followers = Object.values(user.Followers);
      }
      return followers.map((follower) => (
        <li>
          <div className="author-pic" />
          <NavigationItem to={`/profil/!${follower}`}>
            <h5 onClick={() => props.setActive(false)}>{follower}</h5>
          </NavigationItem>
          <Follow userToFollowPseudo={follower} />
        </li>
      ));
    }
  };
  return (
    <div className="follow-displayer-container">
      <div className="follow-displayer">
        <h1>{props.param === 'Follow' ? 'Follow(s)' : 'Follower(s)'}</h1>
        <span onClick={() => props.setActive(false)}>X</span>
        <div>
          <ul>{followFollowerDisplayer()}</ul>
        </div>
      </div>
    </div>
  );
};

export default FollowDisplayer;
