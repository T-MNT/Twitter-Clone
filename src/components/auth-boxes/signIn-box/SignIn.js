import React from 'react';
import { useState } from 'react';

import { auth } from '../../../config/firebase/firebaseConfig';
import axios from 'axios';
import routes from '../../../config/routes';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignIn = (props) => {
  //variables/states
  const [pseudo, setPseudo] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState();
  const [user, setUser] = useState({
    pseudo: '',
    mail: '',
    bio: '',
    link: '',
    inscriptionDate: '',
  });
  let history = useNavigate();

  /////////////USE EFFECT////////////////
  useEffect(() => {
    axios
      .get(
        'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users.json'
      )
      .then((res) => setUserList(Object.keys(res.data)));
  }, []);

  //fonctions

  const close = () => {
    props.setActive(false);
  };

  const sendForm = (e) => {
    e.preventDefault();
    if (pseudo !== '' && !userList.includes('@' + pseudo)) {
      let newUser = { ...user };
      newUser.pseudo = pseudo;
      newUser.displayName = '@' + pseudo;
      newUser.mail = mail;
      newUser.inscriptionDate = new Date().toLocaleDateString();

      auth
        .createUserWithEmailAndPassword(mail, password)

        .then(async (userAuth) => {
          await userAuth.user.updateProfile({ displayName: '@' + pseudo });

          axios
            .put(
              `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${newUser.displayName}/Profil.json`,
              newUser
            )
            .then((response) => {
              if (response.status == 200) {
                history(routes.HOME);
              }
            });
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            document.getElementById('error').textContent =
              'Cette adresse email est déjà utilisée';
          }
          if (error.code === 'auth/invalid-email') {
            document.getElementById('error').textContent =
              'Adresse mail invalide';
          }
          if (error.code === 'auth/weak-password') {
            document.getElementById('error').textContent =
              'Le mot de passe doit contenir au moins six caractères';
          }
        });
    }

    if (userList.includes('@' + pseudo)) {
      document.getElementById('error').textContent =
        "Ce nom d'utilisateur est déjà utilisé";
    }
    if (pseudo.length < 2) {
      document.getElementById('error').textContent =
        "Veuillez indiquer votre nom d'utilisateur";
    }
  };
  return (
    <div className="auth-boxes" id="signIn">
      <p onClick={() => close()} id="close">
        X
      </p>

      <form>
        <h2>Créer votre compte</h2>
        <p id="error"></p>
        <div className="label-input">
          <label>Pseudo</label>
          <input
            type="text"
            onChange={(e) => setPseudo(e.target.value)}
          ></input>
        </div>
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

        <input type="submit" value="Confirmer" onClick={(e) => sendForm(e)} />
      </form>
    </div>
  );
};

export default SignIn;
