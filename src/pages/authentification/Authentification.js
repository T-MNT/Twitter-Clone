import React, { useState } from 'react';
import LogIn from '../../components/auth-boxes/login-box/LogIn';
import SignIn from '../../components/auth-boxes/signIn-box/SignIn';

const Authentification = () => {
  const [active, setActive] = useState(false);
  const [logActive, setLogActive] = useState(false);

  return (
    <div className="auth">
      {active ? <SignIn setActive={setActive} /> : null}
      {logActive ? <LogIn setLogActive={setLogActive} /> : null}
      <div className="auth-container">
        <div className="img-part"></div>
        <div className="auth-part">
          <div className="auth-part-container">
            <h1>
              Ça se passe <br></br>
              maintenant
            </h1>
            <h2>Rejoignez Twitter dès aujourd'hui.</h2>
            <div className="log-part">
              <button id="tel" onClick={(e) => setActive(true)}>
                S'inscrire avec une adresse mail
              </button>
              <p>
                En vous inscrivant, vous acceptez les Conditions d'Utilisation
                et la Politique de Confidentialité, incluant l'Utilisation de
                Cookies.
              </p>
              <h3>Vous avez déjà un compte ?</h3>
              <button id="login" onClick={(e) => setLogActive(true)}>
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ul-container">
        <ul>
          <li>A propos</li>
          <li>Centre d'assistance</li>
          <li>Conditions d'utilisation</li>
          <li>Politique de confidentialité</li>
          <li>Politique relative aux cookies</li>
          <li>Accessibilité</li>
          <li>Informations sur les publicités</li>
          <li>Blog</li>
          <li>Statut</li>
          <li>Carrières</li>
          <li>Ressources de la marque</li>
          <li>Publicité</li>
          <li>Marketing</li>
          <li>Twitter pour les professionnels</li>
          <li>Développeurs</li>
          <li>Répertoire</li>
          <li>Paramètres</li>
        </ul>
      </div>
    </div>
  );
};

export default Authentification;
