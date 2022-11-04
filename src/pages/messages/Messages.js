import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MessageResearch from '../../components/messagesResearch/MessageResearch';
import { useSelector } from 'react-redux';

const Messages = () => {
  const [research, setResearch] = useState();
  const [conversations, setConversations] = useState();
  const [newMessageActive, setNewMessageActive] = useState(false);

  const userProfil = useSelector((state) => state.userReducer.user);
  let conversationsArray = [];

  useEffect(() => {
    if (userProfil && userProfil.displayName) {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Conversations.json`
        )
        .then((res) => setConversations(res.data));
    }
  }, []);

  useEffect(() => {
    conversationsHandler();
  }, [conversations]);

  const conversationsHandler = () => {
    for (let key in conversations) {
      let conv = {
        messagedUser: key,
        conversationContent: Object.values({ ...conversations[key] }),
      };
      conversationsArray.push(conv);
      console.log(conversationsArray);
    }
  };

  return (
    <div className="messages">
      {newMessageActive ? (
        <MessageResearch setNewMessageActive={setNewMessageActive} />
      ) : null}
      <div className="m-left-part">
        <header className="header">
          <h1>Messages</h1>
          <button onClick={() => setNewMessageActive(true)}>
            <FontAwesomeIcon icon={faMessage} id="message-logo" />
          </button>
          <input
            type="text"
            maxLength={28}
            placeholder="Rechercher une conversation"
            onChange={(e) => setResearch(e.target.value)}
          />
        </header>
      </div>
      <div className="m-right-part"></div>
    </div>
  );
};

export default Messages;
