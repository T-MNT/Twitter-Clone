import React from 'react';

import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPostsData } from '../../feature/posts.slice';

const Tweet_box = (props) => {
  const [tweet, setTweet] = useState({
    tweet: '',
    authorUid: '',
    authorPseudo: '',
    date: '',
  });

  const userProfil = useSelector((state) => state.userProfilReducer.profil);
  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  //Fonctions//

  const dateFormater = () => {
    let d =
      new Date().toLocaleDateString().toString() +
      ' ' +
      new Date().toLocaleTimeString().toString();
    return d;
  };

  //Fonctions relatives aux tweets//

  const makeTweet = (e) => {
    let newTweet = { ...tweet };
    newTweet.tweet = e.target.value;
    newTweet.authorUid = user && user.uid ? user.uid : null;
    newTweet.authorPseudo =
      userProfil && userProfil.pseudo ? userProfil.pseudo : null;
    newTweet.authorDisplayName =
      user && user.displayName ? user.displayName : null;
    newTweet.date = dateFormater();
    setTweet(newTweet);
  };

  const sendTweet = (tweet) => {
    if (!tweet.tweet == '') {
      axios
        .post(
          'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json',
          tweet
        )
        .then(() => {
          axios
            .get(
              'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json'
            )
            .then((res) => dispatch(setPostsData(res.data)));
          props.setActive(false);
        });
    }
  };

  return (
    <div className="tweet-box">
      <p onClick={(e) => props.setActive()}>X</p>
      <div className="pic-textarea">
        <div className="author-pic" />
        <textarea
          placeholder="Quoi de neuf ?"
          onChange={(e) => makeTweet(e)}
          maxLength={280}
        />
      </div>

      <button onClick={(e) => sendTweet(tweet)}>Tweeter</button>
    </div>
  );
};

export default Tweet_box;
