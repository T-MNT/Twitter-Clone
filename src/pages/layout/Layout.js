import React from 'react';
import { useState } from 'react';

import axios from 'axios';
import Navigation from './navigation/Navigation';
import Tweet_box from '../../components/tweet-box/Tweet_box';
import FriendSuggest from './friendsSuggest/FriendSuggest';
import { auth } from '../../config/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

import routes from '../../config/routes';
import { useSelector } from 'react-redux';
import NavigationItem from './navigation/navigationItem/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Layout = (props) => {
  const [active, setActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  let history = useNavigate();

  const userProfil = useSelector((state) => state.userProfilReducer.profil);
  const posts = useSelector((state) => state.postReducer.posts);

  const logout = () => {
    auth.signOut(props.user).then(history(routes.AUTH));
  };

  //Fonction recherche//
  const search = async (e) => {
    e.preventDefault();
    if (String(searchInput).length > 0) {
      let allUsers;
      let searchedUsers = [];
      let searchedPosts = [];
      try {
        await axios
          .get(
            'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users.json'
          )
          .then((res) => (allUsers = res.data));
      } catch (error) {
        console.log(error);
      }

      for (let key in allUsers) {
        if (
          allUsers[key].Profil.displayName.includes(searchInput) ||
          allUsers[key].Profil.pseudo.includes(searchInput)
        ) {
          searchedUsers.push(allUsers[key]);
          console.log(searchedUsers);
        }
      }
      for (let key in posts) {
        if (posts[key].tweet.includes(searchInput)) {
          const newPost = { ...posts[key], id: [key] };
          searchedPosts.push(newPost);
          console.log(searchedPosts);
        }
      }
      history(routes.RESEARCH, {
        state: { searchedUsers: searchedUsers, searchedPosts: searchedPosts },
      });
    }
  };

  return (
    <div className="main">
      <div style={active ? { width: '100vw' } : null} id="white-bg"></div>
      <nav>
        <div className="navigation-container">
          <Navigation />
          <button className="blue-button" onClick={(e) => setActive(true)}>
            <FontAwesomeIcon icon={faPen} style={{ color: '#0b0b0b' }} />
          </button>
          <button
            className="blue-white-button"
            id="tweet-button"
            onClick={(e) => setActive(true)}
          >
            Tweeter
          </button>
        </div>

        <div className="prof-logout-container">
          <NavigationItem
            to={`/profil/!${
              userProfil && userProfil.displayName
                ? userProfil.displayName
                : null
            }`}
          >
            <div className="profile">
              <div className="author-pic" />
              <div className="profile-pseudo-dp">
                <p className="pseudo">
                  {userProfil && userProfil.pseudo ? userProfil.pseudo : null}
                </p>
                <p>{props.user ? props.user._delegate.displayName : null}</p>
              </div>
            </div>
          </NavigationItem>
          <button className="blue-button" onClick={(e) => logout()}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: '#0b0b0b' }}
            />
          </button>
          <button className="blue-white-button" onClick={(e) => logout()}>
            Déconnexion
          </button>
        </div>
      </nav>

      <section
        className={
          document.location.href.split('/')[3] === 'messages'
            ? 'main-part-messages'
            : 'main-part'
        }
      >
        {props.children}
      </section>
      {document.location.href.split('/')[3] === 'messages' ? null : (
        <section className="trendings-part">
          <form id="searchbar" onSubmit={(e) => search(e)}>
            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Recherche Twitter"
            />
          </form>

          <div className="friends-suggests">
            <FriendSuggest user={props.user} />
          </div>
        </section>
      )}
      <div className="tweet_box-container">
        {active ? <Tweet_box setActive={setActive} /> : null}
      </div>
    </div>
  );
};

export default Layout;
