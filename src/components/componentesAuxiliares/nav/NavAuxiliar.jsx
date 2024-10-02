import React from 'react';

import '../nav/NavAuxiliar.css'

import { NavLink } from 'react-router-dom';

function NavAuxiliar() {
  return (
    <>
    
    <div className="container_navAuxiliar">
      <nav className="navbar_auxiliares">
        <NavLink to='/home-auxiliar' className='navbar_auxiliares p_rel c_black text_nav'>Home</NavLink>
        <NavLink to='/crear-tickets-auxiliar' className='navbar_auxiliares p_rel c_black text_nav'>Crear tickets</NavLink>
      </nav>
    </div>

    </>
  );
}

export default NavAuxiliar;
