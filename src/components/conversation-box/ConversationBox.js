import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ConversationBox = (props) => {
  console.log(props);
  const userProfil = useSelector((state) => state.userProfilReducer.profil);

  const [newMessageContent, setNewMessageContent] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    let date =
      new Date().toLocaleDateString().toString() +
      ' ' +
      new Date().toLocaleTimeString().toString();
    let newMessage = {
      authorDisplayName:
        userProfil && userProfil.displayName ? userProfil.displayName : null,
      authorPseudo: userProfil && userProfil.pseudo ? userProfil.pseudo : null,
      messageContent: newMessageContent,
      displayedDate: date,
    };

    axios.post(
      `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Conversations/${props.conversationData.messagedUser}.json`,
      newMessage
    );
    axios.post(
      `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${props.conversationData.messagedUser}/Conversations/${userProfil.displayName}.json`,
      newMessage
    );
  };

  const messagesMapper = () => {
    return props.conversationData.conversationContent.map((message) => (
      <li
        id={
          message.authorDisplayName === userProfil.displayName
            ? 'li-my-message'
            : 'li-friend-message'
        }
      >
        <div
          className="message"
          id={
            message.authorDisplayName === userProfil.displayName
              ? 'my-message'
              : 'friend-message'
          }
        >
          <h4>{message.authorPseudo}</h4>
          <p>{message.messageContent}</p>
        </div>

        <p id="message-date">{message.displayedDate}</p>
      </li>
    ));
  };
  return (
    <div className="conversation-box">
      <h1>{props.conversationData.messagedUser}</h1>
      <ul>{messagesMapper()}</ul>
      <div className="textarea-container">
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            onChange={(e) => setNewMessageContent(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ConversationBox;
