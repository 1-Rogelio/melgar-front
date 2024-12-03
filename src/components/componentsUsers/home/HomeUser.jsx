import React, { use } from 'react';

import '../../../index.css';

import Fondo from '../../../assets/images/fondoContabilidad.jpg';

import HeaderUser from '../header/HeaderUser';

function HomeUser() {
  return (
    <>
    
    <div className="fondo_main">

      <HeaderUser/>

      <div className="container_api_info_user">
      <h1 className='text_positionCenter text_title'>Sistema de tickets</h1>

      <h2 className='text_positionCenter text_global_medium'>
        Gestiona tus solicitudes de manera eficiente.
      </h2>
    </div>

    <div className='image_container'>
      <img src={Fondo} className='img-fluid image_responsive' alt="" />
    </div>

    <center>
      <div className='container_sobre_la_api'>
        <div className='container_encabezado '>
          <h1 className='text_caption'>Bienvenido a nuestro Sistema de tickets</h1>
          <p className='text_global_small c_grey'>Aprende cómo funciona nuestra plataforma.</p>
        </div>

        <div className='container_body'>
          <p className='parrafo_info text_global_small c_black'>Nuestro sistema de tickets te permite solicitar asistencia, reportar problemas o hacer peticiones de manera 
            organizada y eficiente.
          </p>
          <div className='container_viñetas'>
            <div className='colum_viñetas'>
              <i className='pi pi-check'></i>
            </div>
            <div className='column_info'>
              <p className='text_global c_black'>Crea tickets para cualquier tipo de solicitud.</p>
            </div>
          </div>

          <div className='container_viñetas'>
            <div className='colum_viñetas'>
              <i className='pi pi-check'></i>
            </div>
            <div className='column_info'>
              <p className='text_global c_black'>Da seguimiento al estado de tus tickets en tiempo real.</p>
            </div>
          </div>

          <div className='container_viñetas'>
            <div className='colum_viñetas'>
              <i className='pi pi-check'></i>
            </div>
            <div className='column_info'>
              <p className='text_global c_black'>Recibe notificaciones sobre actualizaciones de tus tickets.</p>
            </div>
          </div>

          <div className='container_viñetas'>
            <div className='colum_viñetas'>
              <i className='pi pi-check'></i>
            </div>
            <div className='column_info'>
              <p className='text_global c_black'>Comunícate directamente con nuestro equipo de soporte.</p>
            </div>
          </div>

          <div className="container_boton">
            <button className='button_user text_global c_black'>Espera a que te asignen un rol.</button>
          </div>
        </div>
      </div>
    </center>


    </div>

    </>
  );
}

export default HomeUser;
