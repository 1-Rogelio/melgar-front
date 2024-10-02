import React from 'react';

import '../nav/NavUser.css';

import { NavLink } from 'react-router-dom';

function NavUser() {
  return (
    <>

    <div className="container_navUser">
        <nav className='navbar_user'>
            <NavLink to='/home-user' className='p_rel c_black text_nav'>Home</NavLink>
        </nav>
    </div>

    </>
  );
}

export default NavUser;
