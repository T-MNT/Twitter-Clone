import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';

const TweetPage = (props) => {
  const [tweetData, setTweetData] = useState();
  const [tweetResponses, setTweetResponses] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${urlHandler()}.json`
      )
      .then((response) => setTweetData(response.data));
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets/${urlHandler()}/Comments.json`
      )
      .then((response) => setTweetResponses(response.data));
  }, []);

  let tweetId;

  const urlHandler = () => {
    tweetId = document.location.href;

    return tweetId.split('!')[1];
  };

  let commentsData = [];
  let displayedComments;

  if (tweetResponses) {
    for (let key in tweetResponses) {
      const mappedData = { ...tweetResponses[key], id: key };
      commentsData.push(mappedData);
    }
    displayedComments = commentsData.map((response) => (
      <Card
        authorPseudo={response.authorPseudo}
        authorDisplayName={response.authorDisplayName}
        authorUid={response.authorUid}
        tweetContent={response.commentContent}
        id={response.id}
        date={response.date}
        user={props.user}
      />
    ));
  }

  urlHandler();

  return (
    <div>
      <div className="h2-container">
        <h2>Discussion</h2>
      </div>

      <Card
        authorPseudo={tweetData ? tweetData.authorPseudo : null}
        authorDisplayName={tweetData ? tweetData.authorDisplayName : null}
        tweetContent={tweetData ? tweetData.tweet : null}
        date={tweetData ? tweetData.date : null}
        id={urlHandler()}
        user={props.user}
      />
      <ul>
        <li>{tweetResponses ? displayedComments : null}</li>
      </ul>
    </div>
  );
};

export default TweetPage;
