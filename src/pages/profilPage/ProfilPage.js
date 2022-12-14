import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowLeftLong,
  faCalendarDays,
  faLink,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ProfilEditBox from '../../components/profil-edit-box/ProfilEditBox';
import { useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { useLocation } from 'react-router-dom';
import Follow from '../../components/followButton/Follow';
import FollowDisplayer from '../../components/followDisplayer/FollowDisplayer';

const ProfilPage = () => {
  ////////////STATES//////////////////
  const [editActive, setEditActive] = useState(false);
  const [media, setMedia] = useState('Tweets');
  const [userData, setUserData] = useState();
  const [followFollowerActive, setFollowFollowerActive] = useState(false);
  const [displayerParam, setDisplayerParam] = useState('');
  const [blankActive, setBlankActive] = useState(false);
  ////////////REDUX///////////////////
  const userProfil = useSelector((state) => state.userProfilReducer.profil);
  const user = useSelector((state) => state.userReducer.user);
  const posts = useSelector((state) => state.postReducer.posts);
  ////////////////////////////////////

  let url = useLocation();

  const urlHandler = () => {
    let userDisplayName = document.location.href.split('!')[1];
    return userDisplayName;
  };

  useEffect(() => {
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${urlHandler()}.json`
      )
      .then((res) => setUserData(res.data));
  }, [url]);

  //////////////FOLLOWERS DISPLAYER///////////////////////////////////////////////

  const followerDisplayer = () => {
    if (
      user &&
      user.displayName &&
      user.displayName === document.location.href.split('!')[1]
    ) {
      if (userProfil && userProfil.Followers) {
        if (Object.values(userProfil.Followers).length > 1) {
          return (
            <div onClick={() => followerListDisplayer()}>
              {Object.values(userProfil.Followers).length + ' abonnés'}
            </div>
          );
        } else
          return (
            <div onClick={() => followerListDisplayer()}>
              {Object.values(userProfil.Followers).length + ' abonné'}
            </div>
          );
      } else return '0 abonné';
    } else {
      if (userData && userData.Profil.Followers) {
        if (Object.values(userData.Profil.Followers).length > 1) {
          return (
            <div onClick={() => followerListDisplayer()}>
              {Object.values(userData.Profil.Followers).length + ' abonnés'}
            </div>
          );
        } else
          return (
            <div onClick={() => followerListDisplayer()}>
              {Object.values(userData.Profil.Followers).length + ' abonné'}
            </div>
          );
      } else return 0 + ' abonné';
    }
  };

  ///////////////////////////////////////////////////////////////////////////////
  const followListDisplayer = () => {
    setFollowFollowerActive(true);
    setDisplayerParam('Follow');
  };
  const followerListDisplayer = () => {
    setFollowFollowerActive(true);
    setDisplayerParam('Follower');
  };

  /////////////////FOLLOWS DISPLAYER/////////////////////////////////////////////

  const followDisplayer = () => {
    if (
      user &&
      user.displayName &&
      user.displayName === document.location.href.split('!')[1]
    ) {
      if (userProfil && userProfil.Follows) {
        if (Object.values(userProfil.Follows).length > 1) {
          return (
            <div onClick={() => followListDisplayer()}>
              {Object.values(userProfil.Follows).length + ' abonnements'}
            </div>
          );
        } else
          return (
            <div onClick={() => followListDisplayer()}>
              {Object.values(userProfil.Follows).length + ' abonnement'}
            </div>
          );
      } else return 0 + ' abonement';
    } else {
      if (userData && userData.Profil.Follows) {
        if (Object.values(userData.Profil.Follows).length > 1) {
          return (
            <div onClick={() => followListDisplayer()}>
              {Object.values(userData.Profil.Follows).length + ' abonnements'}
            </div>
          );
        } else
          return (
            <div onClick={() => followListDisplayer()}>
              {Object.values(userData.Profil.Follows).length + ' abonnement'}
            </div>
          );
      } else return 0 + ' abonement';
    }
  };

  ////////Follow Button Displayer//////////////////////////////////////////////////
  const followButtonDisplayer = () => {
    if (
      user &&
      user.displayName &&
      !(user.displayName === document.location.href.split('!')[1])
    ) {
      return (
        <div className="profil-follow">
          <Follow
            userToFollowPseudo={document.location.href.split('!')[1]}
            user={user}
          />
        </div>
      );
    }
  };

  ///////////////LINK DISPLAYER////////////////////////////////////////////////////

  const linkDisplayer = () => {
    if (
      user &&
      user.displayName &&
      user.displayName === document.location.href.split('!')[1]
    ) {
      if (userProfil && userProfil.link && userProfil.link.length > 0) {
        return (
          <div className="link-date">
            <FontAwesomeIcon icon={faLink} />
            <a href={userProfil ? 'https://www.' + userProfil.link : null}>
              {userProfil ? userProfil.link : null}
            </a>
          </div>
        );
      } else return null;
    } else {
      if (userData && userData.Profil.link && userData.Profil.link.length > 0) {
        return (
          <div className="link-date">
            <FontAwesomeIcon icon={faLink} />
            <a href={userProfil ? 'https://www.' + userData.Profil.link : null}>
              {userData && userData.Profil.link ? userData.Profil.link : null}
            </a>
          </div>
        );
      } else return null;
    }
  };

  ////////////////////LOCATION DISPLAYER//////////////////////////////////////////

  const locationDisplayer = () => {
    if (
      user &&
      user.displayName &&
      user.displayName === document.location.href.split('!')[1]
    ) {
      if (userProfil && userProfil.location && userProfil.location.length > 0) {
        return (
          <div className="location-container">
            <FontAwesomeIcon icon={faLocationDot} />
            <p id="location">{userProfil ? userProfil.location : null}</p>
          </div>
        );
      } else return null;
    } else {
      if (
        userData &&
        userData.Profil.location &&
        userData.Profil.location.length > 0
      ) {
        return (
          <div className="location-container">
            <FontAwesomeIcon icon={faLocationDot} />
            <p id="location">
              {userData && userData.Profil.location
                ? userData.Profil.location
                : null}
            </p>
          </div>
        );
      } else return null;
    }
  };

  ////////////////////////DATA HANDLER (MAP DE LA DATA)///////////////////////////

  let dataArray = [];
  let displayedData;

  const dataHandler = () => {
    dataArray.push(mappedData);
    displayedData = dataArray.map((userTweet) => (
      <Card
        tweetContent={userTweet.tweet}
        authorPseudo={userTweet.authorPseudo}
        authorDisplayName={userTweet.authorDisplayName}
        authorId={userTweet.authorUid}
        date={userTweet.date}
        key={userTweet.id}
        id={userTweet.id}
        user={userData}
        setBlankActive={setBlankActive}
      />
    ));
  };
  ///////////////////////PUSH DES POSTS DANS MAPPEDDATA SELON CE QUE VEUT VOIR L'UTILISATEUR (TWEETS, RETWEETS, J'AIME)///////////////////////////
  let mappedData = {};

  for (let key in posts) {
    mappedData = {
      ...posts[key],
      id: key,
    };

    if (
      posts &&
      userData &&
      userData.Profil.displayName &&
      mappedData.authorDisplayName === userData.Profil.displayName &&
      media === 'Tweets'
    ) {
      dataHandler();
    }
    if (
      posts &&
      userData &&
      userData.Profil.displayName &&
      userData.Likes &&
      Object.values(userData.Likes).includes(mappedData.id) &&
      media === 'Jaime'
    ) {
      dataHandler();
    }
    if (
      posts &&
      userData &&
      userData.Profil.displayName &&
      userData.Retweets &&
      Object.values(userData.Retweets).includes(mappedData.id) &&
      media === 'Retweets'
    ) {
      dataHandler();
    }
  }

  //////////////////////PROFIL DATA DISPLAYER//////////////////////////////////////

  const profilDataDisplayer = () => {
    /////////////CAS OU L'UTILISATEUR EST SUR SON PROFIL (UTILISATION DE REDUX POUR + DE DYNAMISME)//////////////////////////////////
    if (
      user &&
      user.displayName &&
      user.displayName === document.location.href.split('!')[1]
    ) {
      return (
        <div>
          {editActive ? (
            <ProfilEditBox
              userInfos={userProfil}
              displayName={user && user.displayName ? user.displayName : null}
              active={setEditActive}
            />
          ) : null}
          {editActive || followFollowerActive || blankActive ? (
            <span style={{ width: '100vw' }} id="white-bg" />
          ) : null}
          <div className="profil-container">
            <div className="displayName-container">
              <FontAwesomeIcon icon={faArrowLeftLong} />
              <h3 id="pseudo">
                {user && user.displayName ? user.displayName : null}
              </h3>
            </div>

            <div className="couverture-img" />
            <div className="profil-img" />
            <div className="profil-edit" onClick={(e) => setEditActive(true)}>
              Editer le profil
            </div>
            <div className="user-infos-container">
              <h3>{userProfil ? userProfil.pseudo : null}</h3>
              <p id="dpName">
                {user && user.displayName ? user.displayName : null}
              </p>
              <p className="bio">{userProfil ? userProfil.bio : null}</p>
              {locationDisplayer()}
              <div className="link-date-container">
                <div className="link-date">
                  {linkDisplayer()}
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <p id="date">
                    Inscrit depuis le{' '}
                    {userProfil ? userProfil.inscriptionDate : null}
                  </p>
                </div>
              </div>

              <div className="follow-followers-container">
                <p>{followDisplayer()}</p>
                <p>{followerDisplayer()}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    ///////////CAS OU L'UTILISATEUR EST SUR LE PROFIL DE QUELQU'UN D'AUTRE (UTILISATION D'UN STATE CLASSIQUE)///////////////////////
    else {
      return (
        <div className="profil-container">
          <div className="pseudo-container">
            <FontAwesomeIcon icon={faArrowLeftLong} />
            <h3 id="pseudo">
              {userData && userData.Profil && userData.Profil.displayName
                ? userData.Profil.displayName
                : null}
            </h3>
          </div>

          <div className="couverture-img" />
          <div className="profil-img" />
          {followButtonDisplayer()}
          <div className="user-infos-container">
            <h3>
              {userData && userData.Profil && userData.Profil.pseudo
                ? userData.Profil.pseudo
                : null}
            </h3>
            <p className="bio">
              {userData && userData.Profil && userData.Profil.bio
                ? userData.Profil.bio
                : null}
            </p>
            {locationDisplayer()}
            <div className="link-date-container">
              <div className="link-date">
                {linkDisplayer()}
                <FontAwesomeIcon icon={faCalendarDays} />
                <p id="date">
                  Inscrit depuis le{' '}
                  {userData &&
                  userData.Profil &&
                  userData.Profil.inscriptionDate
                    ? userData.Profil.inscriptionDate
                    : null}
                </p>
              </div>
            </div>

            <div className="follow-followers-container">
              <p>{followDisplayer()}</p>
              <p>{followerDisplayer()}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {profilDataDisplayer()}
      {followFollowerActive ? (
        <FollowDisplayer
          userDisplayName={document.location.href.split('!')[1]}
          setActive={setFollowFollowerActive}
          param={displayerParam}
        />
      ) : null}
      <div className="medias-container">
        <ul>
          <li onClick={(e) => setMedia('Tweets')}>Tweets</li>
          <li onClick={(e) => setMedia('Retweets')}>Retweets</li>
          <li onClick={(e) => setMedia('Jaime')}>J'aime</li>
        </ul>
      </div>
      <div className="tweets-container">{displayedData}</div>
    </div>
  );
};

export default ProfilPage;
