import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faRetweet,
  faComment,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Reply_box from '../../components/reply-box/Reply_box';
import NavigationItem from '../../pages/layout/navigation/navigationItem/NavigationItem';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsData } from '../../feature/posts.slice';

const Card = (props) => {
  //States et variables//

  const [likeData, setLikeData] = useState([]);
  const [userLikeData, setUserLikeData] = useState([]);
  const [retweetsData, setRetweetsData] = useState([]);
  const [userRetweetsData, setUserRetweetsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [commentActive, setCommentActive] = useState(false);

  const user = useSelector((state) => state.userReducer.user);
  const posts = useSelector((state) => state.postReducer.posts);
  const dispatch = useDispatch();

  //////////////////////

  const deleteTweet = () => {
    axios.delete(
      `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}.json`
    );
    setTimeout(() => {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json`
        )
        .then((res) => dispatch(setPostsData(res.data)));
    }, 15);
  };

  //Fonctions relatives aux likes//

  //MAJ des likes du tweet//

  const likeTweet = () => {
    if (!Object.values(likeData).includes(user.uid)) {
      axios
        .post(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Likes.json`,
          JSON.stringify(user.uid)
        )
        .then(() => {
          axios
            .get(
              'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json'
            )
            .then(likeDataGetter())
            .then((res) => dispatch(setPostsData(res.data)));
        });

      axios.post(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${user.displayName}/Likes.json`,
        JSON.stringify(props.id)
      );
    } else {
      let likeIndex = likeData.indexOf(user.uid);
      let userLikeIndex = userLikeData.indexOf(props.id);

      let newLikeData = [...likeData];
      newLikeData = newLikeData
        .slice(0, likeIndex)
        .concat(newLikeData.slice(likeIndex + 1));
      setLikeData(newLikeData);
      axios
        .put(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Likes.json`,
          newLikeData
        )
        .then(() => {
          axios
            .get(
              'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json'
            )
            .then(likeDataGetter())
            .then((res) => dispatch(setPostsData(res.data)));
        });

      ///MAJ des likes de l'utilisateur///

      let newUserLikeData = [...userLikeData];
      newUserLikeData = newUserLikeData
        .slice(0, userLikeIndex)
        .concat(newLikeData.slice(userLikeIndex + 1));
      axios
        .put(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${user.displayName}/Likes.json`,
          newUserLikeData
        )
        .then(
          setTimeout(() => {
            likeDataGetter();
          }, 100)
        );
    }
  };

  ///GET de la data du tweet///

  const likeDataGetter = () => {
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Likes.json`
      )
      .then((res) => {
        if (res.data) {
          setLikeData(Object.values(res.data));
        }
      });

    if (user) {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${user.displayName}/Likes.json`
        )
        .then((res) => {
          if (res.data) {
            setUserLikeData(Object.values(res.data));
          }
        });
    }
  };

  ///Affichage des likes///

  const likeDisplayer = () => {
    if (
      posts &&
      posts[props.id] &&
      posts[props.id].Likes &&
      Object.values(posts[props.id].Likes).length === 0
    ) {
      return null;
    } else if (posts && posts[props.id] && posts[props.id].Likes) {
      return Object.values(posts[props.id].Likes).length;
    }
  };

  useEffect(() => {
    likeDisplayer();
    retweetsDataGetter();
  }, [props.user, likeData, userLikeData]);

  //Fonctions relatives aux retweets///////////

  const retweetsDataGetter = () => {
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Retweets.json`
      )
      .then((res) =>
        res.data === null ? null : setRetweetsData(Object.values(res.data))
      );

    if (user && user.displayName) {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${user.displayName}/Retweets.json`
        )
        .then((res) =>
          res.data === null
            ? null
            : setUserRetweetsData(Object.values(res.data))
        );
    }
  };

  const retweet = () => {
    if (!retweetsData.includes(user.uid)) {
      axios
        .post(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Retweets.json`,
          JSON.stringify(user.uid)
        )
        .then(retweetsDataGetter());

      axios
        .post(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${user.displayName}/Retweets.json`,
          JSON.stringify(props.id)
        )

        .then(retweetsDataGetter())
        .then(() => {
          axios
            .get(
              'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json'
            )
            .then(likeDataGetter())
            .then((res) => dispatch(setPostsData(res.data)));
        });
    } else {
      let retweetIndex = retweetsData.indexOf(user.uid);
      let userRetweetIndex = userRetweetsData.indexOf(props.id);

      let newRetweetData = [...retweetsData];
      newRetweetData = newRetweetData
        .slice(0, retweetIndex)
        .concat(newRetweetData.slice(retweetIndex + 1));
      setRetweetsData(newRetweetData);
      axios
        .put(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Retweets.json`,
          newRetweetData
        )
        .then(() => {
          axios
            .get(
              'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json'
            )
            .then(likeDataGetter())
            .then((res) => dispatch(setPostsData(res.data)));
        });

      let newUserRetweetsData = [...userRetweetsData];
      newUserRetweetsData = newUserRetweetsData
        .slice(0, userRetweetIndex)
        .concat(newUserRetweetsData.slice(userRetweetIndex + 1));
      axios
        .put(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${user.displayName}/Retweets.json`,
          newUserRetweetsData
        )
        .then(
          setTimeout(() => {
            retweetsDataGetter();
          }, 100)
        );
    }
  };
  const retweetsDisplayer = () => {
    if (
      posts &&
      posts[props.id] &&
      posts[props.id].Retweets &&
      Object.values(posts[props.id].Retweets).length === 0
    ) {
      return null;
    } else if (posts && posts[props.id] && posts[props.id].Retweets) {
      return Object.values(posts[props.id].Retweets).length;
    }
  };

  /////////////////////////////////////////////

  //Fonctions relatives aux commentaires///////
  const activeComment = () => {
    setCommentActive(true);
    props.setBlankActive(true);
  };

  const commentsDataGetter = () => {
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Comments.json`
      )
      .then((res) => {
        if (res.data) {
          setCommentsData(Object.values(res.data));
        }
      });
  };

  const commentsDisplayer = () => {
    if (commentsData.length == 0) {
      return null;
    } else {
      return commentsData.length;
    }
  };

  /////////////////////////////////////////////

  useEffect(() => {
    if (props.id) {
      commentsDataGetter();
      likeDataGetter();
      retweetsDataGetter();
    }
  }, [props.user]);

  return (
    <div className="card">
      {commentActive ? (
        <Reply_box
          authorPseudo={props.authorPseudo}
          authorDisplayName={props.authorDisplayName}
          tweet={props.tweetContent}
          id={props.id}
          setCommentActive={setCommentActive}
          setBlankActive={props.setBlankActive}
        />
      ) : null}

      <div className="author-pic" />
      {user &&
      user.displayName &&
      props.authorDisplayName === user.displayName ? (
        <div className="delete-tweet" onClick={(e) => deleteTweet()}>
          {props.id === undefined ? null : (
            <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} />
          )}
        </div>
      ) : null}
      <div className="tweet">
        <NavigationItem to={`/profil/!${props.authorDisplayName}`}>
          <div className="author-date-container">
            <h4>{props.authorPseudo}</h4>
            <p>{props.authorDisplayName}</p>

            <p id="tweet-date">
              {props.date
                ? props.date.split(':')[0] + ':' + props.date.split(':')[1]
                : null}
            </p>
          </div>
        </NavigationItem>
        <NavigationItem to={`/tweet/!${props.id}`}>
          <div className="tweet-content-container">
            <p>{props.tweetContent}</p>
          </div>
        </NavigationItem>

        <ul className="icons-list">
          <li>
            <div className="icon-container">
              <FontAwesomeIcon icon={faHeart} onClick={(e) => likeTweet()} />
              <p>{likeDisplayer()}</p>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faRetweet}
                onClick={(e) => retweet()}
                id="icon"
              />
              <p>{retweetsDisplayer()}</p>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faComment}
                onClick={(e) => activeComment()}
                id="icon"
              />
              <p>{commentsDisplayer()}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
