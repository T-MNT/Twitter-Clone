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

  const [newMessageActive, setNewMessageActive] = useState(false);

  const userProfil = useSelector((state) => state.userReducer.user);

  return (
    <div>
      {newMessageActive ? <MessageResearch /> : null}
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
  );
};

export default Messages;
