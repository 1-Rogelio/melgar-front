import React from 'react';

import HeaderUser from './header/HeaderUser';

function CrearTicketsInfo() {
  return (
    <>

    <HeaderUser/>

   
      <div className="center">
      <div className="container_crear_ticket_info">
        <div className="container_titulo_crear_ticket_nuevo">
          <h1 className='text_caption'>Como crear un nuevo ticket</h1>
          <h2 className='text_global_small c_grey'> Sigue estos pasos para solicitar asistencia</h2>
        </div>

        <div className="container_body_crear_nuevo_ticket">
          <div className='container_numeros'>
            <div className='colum_numeros'>
              <div className='num'>1</div>
            </div>
            <div className='column_info'>
              <p><b className='text_global_small c_black'>Inicia sesión en tu cuenta.</b></p>
              <p className='text_global c_black'>Accede a tu panel de usuario con tus credenciales.</p>
            </div>
          </div>

          <div className='container_numeros'>
            <div className='colum_numeros'>
              <div className='num'>2</div>
            </div>
            <div className='column_info'>
              <p><b className='text_global_small c_black'>Haz clic en "Nuevo Ticket".</b></p>
              <p className='text_global c_black'>Busca el botón o enlace para crear un nuevo ticket.</p>
            </div>
          </div>

          <div className='container_numeros'>
            <div className='colum_numeros'>
              <div className='num'>3</div>
            </div>
            <div className='column_info'>
              <p><b className='text_global_small c_black'>Completa el formulario.</b></p>
              <p className='text_global c_black'>Proporciona un título, descripción detallada y categoría para solicitud.</p>
            </div>
          </div>

          <div className='container_numeros'>
            <div className='colum_numeros'>
              <div className='num'>4</div>
            </div>
            <div className='column_info'>
              <p><b className='text_global_small c_black'>Envía tu ticket</b></p>
              <p className='text_global c_black'>Revisa la información y haz clic en "Enviar" para crear ticket.</p>
            </div>
          </div>

        </div>
      </div>
      </div>
   

    </>
  );
}

export default CrearTicketsInfo;
