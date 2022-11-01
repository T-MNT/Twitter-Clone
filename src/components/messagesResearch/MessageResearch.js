import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MessageResearch = () => {
  const [allUsers, setAllUsers] = useState();
  const [research, setResearch] = useState();

  let searchResult = [];
  let mappedSearchResult;

  useEffect(() => {
    axios
      .get(
        'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users.json'
      )
      .then((res) => setAllUsers(res.data));
  }, []);

  useEffect(() => {
    for (let key in allUsers) {
      if (
        allUsers[key].Profil.pseudo.includes(research) ||
        allUsers[key].Profil.displayName.includes(research)
      ) {
        searchResult.push(allUsers[key]);
      }
      console.log(searchResult);
    }
  }, [research]);

  useEffect(() => {
    searchedUsersHandler();
  }, [searchResult]);

  const searchedUsersHandler = () => {
    if (searchResult.length > 0) {
      mappedSearchResult = searchResult.map((user) => (
        <li>
          <div className="author-pic" />
          <h4>{user.Profil.pseudo}</h4>
          <h5>{user.Profil.displayName}</h5>
        </li>
      ));
    } else return 'Aucun utilisateur trouvé';
  };

  return (
    <div className="m-research">
      <h1>Message Recherche</h1>
      <input
        type="text"
        maxLength={28}
        placeholder="Rechercher un utilisateur"
        onChange={(e) => setResearch(e.target.value)}
      />
      <ul>{mappedSearchResult}</ul>
    </div>
  );
};

export default MessageResearch;
