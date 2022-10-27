import React from 'react';
import NavigationItem from '../layout/navigation/navigationItem/NavigationItem';
import Follow from '../../components/followButton/Follow';
import Card from '../../components/card/Card';
import { useLocation } from 'react-router-dom';

const Research = () => {
  const location = useLocation();
  const searchedUsers = location.state.searchedUsers;
  const searchedPosts = location.state.searchedPosts;

  const searchedUsersHandler = () => {
    if (searchedUsers.length > 0) {
      return searchedUsers.map((user) => (
        <li>
          <div className="author-pic" />
          <NavigationItem to={`/profil/!${user.Profil.displayName}`}>
            <h4>{user.Profil.pseudo}</h4>
            <h5>{user.Profil.displayName}</h5>
          </NavigationItem>
          <Follow userToFollowPseudo={user.Profil.displayName} />
        </li>
      ));
    } else return 'Aucun utilisateur trouvé';
  };
  const searchedPostsHandler = () => {
    if (searchedPosts.length > 0) {
      return searchedPosts.map((tweet) => (
        <li>
          <Card
            tweetContent={tweet.tweet}
            authorPseudo={tweet.authorPseudo}
            authorDisplayName={tweet.authorDisplayName}
            authorId={tweet.authorUid}
            date={tweet.date}
            id={tweet.id}
            key={tweet.id}
          />
        </li>
      ));
    } else return <div id="no-tweet">Aucun Tweet trouvé</div>;
  };
  return (
    <div className="search">
      <h1 className="title">Utilisateur(s)</h1>
      <div className="friendSuggest">
        <ul>{searchedUsersHandler()}</ul>
      </div>
      <h1 className={'title'}>Tweet(s)</h1>
      <div className="posts-area">
        <ul className="post-list">{searchedPostsHandler()}</ul>
      </div>
    </div>
  );
};

export default Research;
