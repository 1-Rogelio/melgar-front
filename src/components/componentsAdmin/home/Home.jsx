// Home.js
import React, { useEffect } from 'react';

// Importación de bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '../../../index.css';

import Fondo from '../../../assets/images/fondoContabilidad.jpg';

// Importar componentes
import Header from '../header/Header';
import FielesHome from '../../componentsAdmin/fielesHome/FielesHome';
import TusTickets from '../tusTickets/TusTickets';

function Home() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* --------------MANDAMOS A LLAMAR LOS COMPONENTES A OCUPAR EN EL HOME------------ */}
      <Header />

      <div className='image_container'>
        <img src={Fondo} className='img-fluid image_responsive' alt="" />
      </div>

      <div className="tables-container">
        <FielesHome />
        <TusTickets />
      </div>
    </>
  );
}

export default Home;
