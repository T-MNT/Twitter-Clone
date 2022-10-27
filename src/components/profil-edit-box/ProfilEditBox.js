import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfilData } from '../../feature/userProfil.slice';

const ProfilEditBox = (props) => {
  const [pseudo, setPseudo] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [userTweet, setUserTweet] = useState();

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    setLocation(props.userInfos.location);
    setWebsite(props.userInfos.link);
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    let newData = {};
    {
      pseudo
        ? (newData.pseudo = pseudo)
        : (newData.pseudo = props.userInfos.pseudo);
    }
    {
      bio ? (newData.bio = bio) : (newData.bio = props.userInfos.bio);
    }
    {
      newData.location = location;
    }
    {
      newData.link = website;
    }
    newData.inscriptionDate = props.userInfos.inscriptionDate;
    newData.mail = props.userInfos.mail;
    newData.Follows = props.userInfos.Follows;
    newData.Followers = props.userInfos.Followers;
    newData.displayName = props.userInfos.displayName;

    let newPosts = [];

    for (let key in posts) {
      if (
        user &&
        user.displayName &&
        posts[key].authorDisplayName === user.displayName
      ) {
        const newPost = { ...posts[key], id: key };
        newPosts.push(newPost);
      }
    }

    for (let key in newPosts) {
      newPosts[key].authorPseudo = pseudo;
      axios.put(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${newPosts[key].id}.json`,
        newPosts[key]
      );
    }

    try {
      axios
        .put(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${props.displayName}/Profil.json`,
          newData
        )
        .then(dispatch(setUserProfilData(newData)))
        .then((res) => close());
    } catch (error) {
      console.log(error);
    }
  };

  const close = () => {
    props.active(false);
  };

  return (
    <div className="profil-edit-box">
      <p onClick={(e) => close()} id="close">
        X
      </p>
      <form onSubmit={(e) => sendData(e)}>
        <h2>Editer votre profil</h2>
        <div className="label-input">
          <label>Pseudo</label>
          <input
            type="text"
            onChange={(e) => setPseudo(e.target.value)}
            placeholder={props.userInfos.pseudo}
            defaultValue={props.userInfos.pseudo}
            maxLength={24}
          ></input>
        </div>
        <div className="label-input">
          <label>Bio</label>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            placeholder={props.userInfos.bio ? props.userInfos.bio : null}
            defaultValue={props.userInfos.bio}
            maxLength={108}
          ></textarea>
        </div>
        <div className="label-input">
          <label>Localisation</label>
          <input
            id="location-input"
            type="text"
            onFocus={(e) => setLocation(e.target.value)}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={
              props.userInfos.location ? props.userInfos.location : null
            }
            defaultValue={props.userInfos.location}
            maxLength={24}
          ></input>
        </div>
        <div className="label-input">
          <label>Lien</label>
          <input
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
            placeholder={props.userInfos.link ? props.userInfos.link : null}
            defaultValue={props.userInfos.link}
            maxLength={36}
          ></input>
        </div>
        <input className="blue-white-button" type={'submit'} value="Valider" />
      </form>
    </div>
  );
};

export default ProfilEditBox;
