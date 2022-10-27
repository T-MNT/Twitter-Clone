import React, { useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';

const Reply_box = (props) => {
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.userReducer.user);
  const userProfil = useSelector((state) => state.userProfilReducer.profil);

  const dateFormater = () => {
    let d =
      new Date().toLocaleDateString().toString() +
      ' ' +
      new Date().toLocaleTimeString().toString();
    return d;
  };

  const reply = () => {
    let newComment = {
      commentContent: comment,
      authorUid: user.uid,
      authorPseudo: userProfil.pseudo,
      authorDisplayName: userProfil.displayName,
      type: 'comment',
      date: dateFormater(),
    };

    axios
      .post(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${props.id}/Comments.json`,
        newComment
      )
      .then(closeBox());
  };

  const closeBox = () => {
    props.setCommentActive(false);
    props.setBlankActive(false);
  };

  return (
    <div className="reply-box-container">
      <div className="reply-box">
        <p id="X" onClick={(e) => closeBox()}>
          X
        </p>

        <div className="tweet-format">
          <div className="author-pic" />
          <div className="tweet">
            {' '}
            <div className="tweet-author">
              <h3>{props.authorPseudo}</h3>
              <h4>{props.authorDisplayName}</h4>
            </div>
            <div className="tweet-content">
              <p>{props.tweet}</p>
            </div>
          </div>
        </div>
        <div className="reply-part">
          <div className="tweet-container">
            <div className="tweet-format">
              <div className="author-pic" />
              <div className="tweet">
                {' '}
                <div className="tweet-author">
                  <h3>
                    {userProfil && userProfil.pseudo ? userProfil.pseudo : null}
                  </h3>
                  <h4>
                    {userProfil && userProfil.displayName
                      ? userProfil.displayName
                      : null}
                  </h4>
                </div>
                <div className="tweet-content">
                  <textarea
                    placeholder="Tweetez votre réponse"
                    onChange={(e) => setComment(e.target.value)}
                    id="comment"
                    maxLength={280}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={(e) => reply()}>Répondre</button>
      </div>
    </div>
  );
};

export default Reply_box;
