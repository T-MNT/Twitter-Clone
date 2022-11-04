import React from 'react';
import NavigationItem from './navigationItem/NavigationItem';
import routes from '../../../config/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimneyWindow,
  faMessage,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';
const Navigation = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="navigation">
      <ul>
        <li>
          <div>
            <NavigationItem to={routes.HOME}>
              <FontAwesomeIcon className="icon" icon={faHouseChimneyWindow} />
              <h4>Accueil</h4>
            </NavigationItem>
          </div>
        </li>
        <li>
          <div className="li-content">
            <NavigationItem
              to={`/profil/!${
                user && user.displayName ? user.displayName : null
              }`}
            >
              <FontAwesomeIcon className="icon" icon={faUser} />
              <h4>Profil</h4>
            </NavigationItem>
          </div>
        </li>
        <li>
          <div>
            <NavigationItem to={routes.MESSAGES}>
              <FontAwesomeIcon className="icon" icon={faMessage} />
              <h4>Messages</h4>
            </NavigationItem>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
