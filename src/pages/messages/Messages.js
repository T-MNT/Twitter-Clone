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
  //Data brute de toutes les conversation////////

  //Array de toutes les conversations//////////
  const [conversationsArray, setConversationsArray] = useState([]);
  const [activeConversationData, setActiveConversationData] = useState({});

  const [newMessageActive, setNewMessageActive] = useState(false);
  const [blankActive, setBlankActive] = useState(false);
  const [conversationActive, setConversationActive] = useState(false);
  const userProfil = useSelector((state) => state.userReducer.user);
  let array = [];

  const getConversationsData = () => {
    axios
      .get(
        `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${userProfil.displayName}/Conversations.json`
      )
      .then((res) => brutDataHandler(res.data));
  };

  ////Met le state activeConversationData à jour selon la conversation en cours/////
  const updateActiveConvData = () => {
    if (activeConversationData.messagedUser) {
      for (let key in conversationsArray) {
        if (
          conversationsArray[key].messagedUser ==
          activeConversationData.messagedUser
        ) {
          setActiveConversationData({ ...conversationsArray[key] });
        }
      }
    }
  };

  useEffect(() => {
    updateActiveConvData();
  }, [conversationsArray]);

  useEffect(() => {
    if (userProfil && userProfil.displayName) {
      getConversationsData();
      const interval = setInterval(getConversationsData, 60000);

      return () => clearInterval(interval);
    }
  }, [userProfil]);

  ///////Convertit les données de la bdd en tableau d'objets//////
  const brutDataHandler = (param) => {
    for (let key in param) {
      let conv = {
        messagedUser: key,
        conversationContent: Object.values({ ...param[key] }),
      };
      array.push(conv);
      console.log(array);
    }
    setConversationsArray(array);
    array = [];
  };

  /////Mapping du tableau des conversations////////
  const conversationMapper = () => {
    return conversationsArray.map((conversation) => (
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
    setActiveConversationData(data);
    setConversationActive(true);
  };

  return (
    <div className="messages">
      {blankActive ? (
        <span style={{ width: '100vw' }} id="white-bg">
          <span id="message-research-container">
            {newMessageActive ? (
              <MessageResearch
                openMessageResearch={openMessageResearch}
                refreshData={getConversationsData}
              />
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
          <ConversationBox
            conversationData={activeConversationData}
            refreshData={getConversationsData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Messages;
