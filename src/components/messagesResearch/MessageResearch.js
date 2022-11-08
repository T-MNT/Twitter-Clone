import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MessageResearch = (props) => {
  const [allUsers, setAllUsers] = useState();
  const [research, setResearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const userProfil = useSelector((state) => state.userProfilReducer.profil);

  let result = [];
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
        result.push(allUsers[key]);
        setSearchResults(result);
      }
    }
  }, [research]);

  const searchedUsersHandler = () => {
    console.log(searchResults);
    if (searchResults.length > 0) {
      return searchResults.map((user) => (
        <li onClick={() => createConversation(user.Profil.displayName)}>
          <div className="author-pic" />
          <h4>{user.Profil.pseudo}</h4>
          <h5>{user.Profil.displayName}</h5>
        </li>
      ));
    }
    if (searchResults.length < 1 && research.length > 0) {
      return 'Aucun utilisateur trouvé';
    }
  };

  const createConversation = (userToMessage) => {
    if (userProfil && userProfil.displayName) {
      axios.post(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Conversations/${userToMessage}.json`,
        JSON.stringify('')
      );
      props.openMessageResearch(false);
    }
  };

  return (
    <div className="m-research-container">
      <div className="m-research">
        <span onClick={() => props.openMessageResearch(false)}>X</span>
        <h1>Créer une nouvelle conversation</h1>
        <input
          type="text"
          maxLength={28}
          placeholder="Rechercher un utilisateur"
          onChange={(e) => setResearch(e.target.value)}
        />
        <div className="friendSuggest">
          <ul>{searchedUsersHandler()}</ul>
        </div>
      </div>
    </div>
  );
};

export default MessageResearch;
