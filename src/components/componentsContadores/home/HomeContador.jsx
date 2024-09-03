import React from 'react';

import '../../../index.css';

import Fondo from '../../../assets/images/fondoContabilidad.jpg';

// Importar componentes
import HeaderContador from '../header/HeaderContador'

function HomeUser() {
  return (
    <>
    
    <div className="container_home_contador">

      <HeaderContador/>

      <div className='image_container'>
        <img src={Fondo} className='img-fluid image_responsive' alt="" />
      </div>

      <div className="container_tables">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Officiis doloribus enim quidem sequi, distinctio impedit omnis, 
          ducimus porro culpa delectus sit. Beatae repellat ducimus molestias 
          consectetur omnis. Nam, architecto debitis!
        </p>
        <h1>tables</h1>
      </div>

    </div>
    
    </>
  );
}

export default HomeUser;
