import React from 'react';
import { Link, withRouter} from 'react-router-dom';
export const NavLink  = withRouter(({history, match, location, staticContext, comp, ...props}) => (
  <li className={
    (comp ?
    (comp(match, location, props.to)?
      'active'
      :
      '')
    :
    (location.pathname === ((typeof props.to === 'string')?props.to : props.to.pathname) ?
      'active'
      :
      ''))}>
    <Link {...props} /> 
  </li>
))