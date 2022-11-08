import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MessageResearch from '../../components/messagesResearch/MessageResearch';
import { useSelector } from 'react-redux';
import ConversationBox from '../../components/conversation-box/ConversationBox';

const Messages = () => {
  const [research, setResearch] = useState();
  const [conversationsData, setConversationsData] = useState();
  const [conversations, setConversations] = useState([]);
  const [conversationData, setConversationData] = useState();
  const [newMessageActive, setNewMessageActive] = useState(false);
  const [blankActive, setBlankActive] = useState(false);
  const [conversationActive, setConversationActive] = useState(false);
  const userProfil = useSelector((state) => state.userReducer.user);
  let conversationsArray = [];

  useEffect(() => {
    if (userProfil && userProfil.displayName) {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Conversations.json`
        )
        .then((res) => setConversationsData(res.data));
    }
  }, [userProfil]);

  useEffect(() => {
    conversationsDataHandler();
  }, [conversationsData]);

  const conversationsDataHandler = () => {
    for (let key in conversationsData) {
      let conv = {
        messagedUser: key,
        conversationContent: Object.values({ ...conversationsData[key] }),
      };
      conversationsArray.push(conv);
      setConversations(conversationsArray);
    }
  };

  const conversationMapper = () => {
    return conversations.map((conversation) => (
      <li
        className="conv-container"
        onClick={() => openConversation(conversation)}
      >
        <h4>{conversation.messagedUser}</h4>
        <p>
          {
            conversation.conversationContent[
              conversation.conversationContent.length - 1
            ].messageContent
          }
        </p>
      </li>
    ));
  };

  const openMessageResearch = (param) => {
    setNewMessageActive(param);
    setBlankActive(param);
  };

  const openConversation = (data) => {
    setConversationData(data);
    setConversationActive(true);
  };

  return (
    <div className="messages">
      {blankActive ? (
        <span style={{ width: '100vw' }} id="white-bg">
          <span id="message-research-container">
            {newMessageActive ? (
              <MessageResearch openMessageResearch={openMessageResearch} />
            ) : null}
          </span>
        </span>
      ) : null}

      <div className="m-left-part">
        <header className="header">
          <h1>Messages</h1>
          <button onClick={() => openMessageResearch(true)}>
            <FontAwesomeIcon icon={faMessage} id="message-logo" />
          </button>
          <input
            type="text"
            maxLength={28}
            placeholder="Rechercher une conversation"
            onChange={(e) => setResearch(e.target.value)}
          />
        </header>
        <ul>{conversationMapper()}</ul>
      </div>
      <div className="m-right-part">
        {conversationActive ? (
          <ConversationBox conversationData={conversationData} />
        ) : null}
      </div>
    </div>
  );
};

export default Messages;
