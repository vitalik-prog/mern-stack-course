import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext)
  const logoutHandler = () => {
    logout()
  }
  return (
    <nav>
      <div className="nav-wrapper blue" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Links cutter</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to={'/links'}>Links</Link></li>
          <li><Link to={'/create'}>Create</Link></li>
          <li><button onClick={logoutHandler} className='btn grey lighten-1 black-text'>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;