import React from 'react';

import HeaderUser from './header/HeaderUser';

function Seguimiento() {
  return (
    <>
    
    <HeaderUser/>

    <div className='center'>
      <div className="container_seguimiento">
        <div className="container_crear_ticket_info">
          <div className="container_titulo_crear_ticket_nuevo">
            <h1 className='text_caption'>Seguimiento de tus tickets</h1>
            <h2 className='text_global_small c_grey'>Mantente informado sobre el estado de tus solicitudes.</h2>
          </div>

          <div className="container_body_crear_nuevo_ticket">
            <div className='container_numeros'>
              <div className='colum_numeros'>
                <div className='num'>1</div>
              </div>
              <div className='column_info'>
                <p><b className='text_global_small c_black'>Accede a tu panel de usuario.</b></p>
                <p className='text_global c_black'>Inicia sesión y navega hasta la sección "Mis Tickets".</p>
              </div>
            </div>

            <div className='container_numeros'>
              <div className='colum_numeros'>
                <div className='num'>2</div>
              </div>
              <div className='column_info'>
                <p><b className='text_global_small c_black'>Revisa la lista de tickets.</b></p>
                <p className='text_global c_black'>Verás todos tus tickets con su estado actual y última actualización.</p>
              </div>
            </div>

            <div className='container_numeros'>
              <div className='colum_numeros'>
                <div className='num'>3</div>
              </div>
              <div className='column_info'>
                <p><b className='text_global_small c_black'>Selecciona un ticket específico.</b></p>
                <p className='text_global c_black'>Haz clic en un ticket para ver todos los detalles y el historial de comunicaciones.</p>
              </div>
            </div>

            <div className='container_numeros'>
              <div className='colum_numeros'>
                <div className='num'>4</div>
              </div>
              <div className='column_info'>
                <p><b className='text_global_small c_black'>Añade comentarios o actualizaciones</b></p>
                <p className='text_global c_black'>Puedes proporcionar información adicional o responder a las preguntas del equipo de soporte.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default Seguimiento;
