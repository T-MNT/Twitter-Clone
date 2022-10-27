import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebase/firebaseConfig';
import routes from '../../../config/routes';

const LogIn = (props) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  let history = useNavigate();

  const loginHandler = (e, mail, password) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(mail, password)
      .then(() => history(routes.HOME))
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          document.getElementById('error').textContent =
            'Mot de passe incorrect';
        }
        if (error.code === 'auth/invalid-email') {
          document.getElementById('error').textContent =
            'Adresse mail inconnue ou invalide';
        }
        if (error.code === 'auth/user-not-found') {
          document.getElementById('error').textContent =
            'Adresse mail inconnue ou invalide';
        }
      });
  };

  const close = () => {
    props.setLogActive(false);
  };

  return (
    <div className="auth-boxes" id="logIn">
      <p onClick={() => close()} id="close">
        X
      </p>

      <form>
        <h2>Connexion</h2>

        <p id="error"></p>
        <div className="label-input">
          <label>Email</label>
          <input type="text" onChange={(e) => setMail(e.target.value)}></input>
        </div>
        <div className="label-input">
          <label>Mot de passe</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <input
          type="submit"
          value="Confirmer"
          onClick={(e) => loginHandler(e, mail, password)}
        />
      </form>
    </div>
  );
};

export default LogIn;
