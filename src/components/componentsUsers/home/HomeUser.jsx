import React from 'react';

import '../../../index.css';

import Fondo from '../../../assets/images/fondoContabilidad.jpg';

import HeaderUser from '../header/HeaderUser';

function HomeUser() {
  return (
    <>
    
    <div className="fondo_main">

      <HeaderUser/>

      <div className='image_container'>
        <img src={Fondo} className='img-fluid image_responsive' alt="" />
      </div>

    </div>

    </>
  );
}

export default HomeUser;
