import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Card from '../../components/card/Card';

import { setPostsData } from '../../feature/posts.slice';

const Home = (props) => {
  //States et variables//

  const [tweet, setTweet] = useState({
    tweet: '',
    authorUid: '',
    authorPseudo: '',
    date: '',
  });

  const [blankActive, setBlankActive] = useState(false);

  const posts = useSelector((state) => state.postReducer.posts);
  const userProfil = useSelector((state) => state.userProfilReducer.profil);
  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  let displayedData;

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
          document.getElementById('post').value = '';
        });
    }
  };

  //Fonctions relatives à la Data//

  const dataOp = () => {
    let dataArray = [];

    for (let key in posts) {
      const mappedData = {
        ...posts[key],
        id: key,
      };

      if (
        userProfil &&
        userProfil.Follows &&
        Object.values(userProfil.Follows).includes(mappedData.authorDisplayName)
      ) {
        dataArray.push(mappedData);
        displayedData = dataArray.map((tweet) => (
          <Card
            tweetContent={tweet.tweet}
            authorPseudo={tweet.authorPseudo}
            authorDisplayName={tweet.authorDisplayName}
            authorId={tweet.authorUid}
            date={tweet.date}
            key={tweet.id}
            id={tweet.id}
            user={props.user}
            setBlankActive={setBlankActive}
          />
        ));
      }
    }
  };

  useEffect(() => {
    dataOp();
  }, []);

  dataOp();
  dateFormater();

  return (
    <div className="home">
      {blankActive ? <span style={{ width: '100vw' }} id="white-bg" /> : null}
      <h1>Accueil</h1>
      <div className="post-area-container">
        <div className="author-pic" />
        <div className="post-area">
          <textarea
            id="post"
            placeholder="Quoi de neuf ?"
            onChange={(e) => makeTweet(e)}
            maxLength={280}
          />
          <div className="icons-button-container">
            <button onClick={(e) => sendTweet(tweet)}>Tweeter</button>
          </div>
        </div>
      </div>

      <div className="elements-displayer">
        <ul>
          {userProfil && userProfil.Follows ? (
            displayedData
          ) : (
            <p id="nofollow">Vous ne suivez personne pour le moment</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
