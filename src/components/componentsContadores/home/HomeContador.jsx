import React from 'react';

import '../../../index.css';

import Fondo from '../../../assets/images/fondoContabilidad.jpg';

// Importar componentes
import HeaderContador from '../header/HeaderContador';
import TusTicketsContador from '../TusTicketsContador';
import TusFielesContador from '../TusFielesContador';

function HomeUser() {
  return (
    <>
    
    <div className="fondo_main">

      <HeaderContador/>

      <div className='image_container'>
        <img src={Fondo} className='img-fluid image_responsive' alt="" />
      </div>

      <div className="tables-container">
        <TusFielesContador/>
        <TusTicketsContador/>
      </div>

    </div>
    
    </>
  );
}

export default HomeUser;
