import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Follow from '../../../components/followButton/Follow';

import NavigationItem from '../navigation/navigationItem/NavigationItem';

const FriendSuggest = () => {
  const [usersData, setUsersData] = useState([]);
  const [userFollowData, setUserFollowData] = useState([]);

  const userProfil = useSelector((state) => state.userProfilReducer.profil);
  let mappedData;

  useEffect(() => {
    if (userProfil && userProfil.displayName) {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users.json`
        )
        .then((res) => setUsersData(Object.values(res.data)));
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Profil/Follows.json`
        )
        .then((res) => setUserFollowData(Object.values(res.data)));
    }
  }, [userProfil]);

  if (userProfil && userProfil.displayName) {
    mappedData = usersData
      .filter((user) => user.Profil.displayName !== userProfil.displayName)
      .filter((user) =>
        userProfil.Follows
          ? !userFollowData.includes(user.Profil.displayName)
          : user.Profil.displayName !== userProfil.displayName
      )
      .slice(0, 5)
      .map((user) => (
        <li>
          <div className="author-pic" />
          <NavigationItem to={`/profil/!${user.Profil.displayName}`}>
            <h4>{user.Profil.pseudo}</h4>
          </NavigationItem>
          <Follow userToFollowPseudo={user.Profil.displayName} />
        </li>
      ));
  }

  return (
    <div className="friendSuggest">
      <h3>Suggestions</h3>
      <ul>{mappedData}</ul>
    </div>
  );
};

export default FriendSuggest;
