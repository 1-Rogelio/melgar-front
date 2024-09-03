import React from 'react';

import '../../componentsContadores/navbar/NavContador.css';

import { NavLink } from 'react-router-dom';


function NavUser() {
  return (
    <>

    <div className='container_navContador'>

      <nav className='navbar_contadores'>
        <NavLink to={'/home-contador'} className='p_rel c_black text_nav'>Home</NavLink>
        <NavLink to={'/crear-tickets'} className='p_rel c_black text_nav'>Crear tickets</NavLink>
        <NavLink to={'/clientes-contadores'} className='p_rel c_black text_nav'>Clientes</NavLink>
      </nav>

    </div>

    </>
  );
}

export default NavUser;
