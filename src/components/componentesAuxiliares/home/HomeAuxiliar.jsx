import React from 'react';

import '../../../index.css';

import Fondo from '../../../assets/images/fondoContabilidad.jpg';

// Importar componentes
import HeaderAuxiliar from '../header/HeaderAuxiliar';
import TusTicketsAuxiliar from '../TusTicketsAuxiliar'

function HomeAuxiliar() {
  return (
    <>

    <div className="fondo_main">

      <HeaderAuxiliar/>

      <div className='image_container'>
        <img src={Fondo} className='img-fluid image_responsive' alt="" />
      </div>

      <div className="tables-container">
        <TusTicketsAuxiliar/>
      </div>

    </div>
    </>
  );
}

export default HomeAuxiliar;
