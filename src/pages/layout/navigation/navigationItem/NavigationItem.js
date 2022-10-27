import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <div className="navigation-item">
      <NavLink to={props.to}>{props.children}</NavLink>
    </div>
  );
};

export default NavigationItem;
