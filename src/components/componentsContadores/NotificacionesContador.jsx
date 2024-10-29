import React from 'react';

function NotificacionesContador({ notificaciones }) {
  return (
    <>
    
    <div className='notificaciones'>
        {notificaciones.length === 0 ? (
          <p>no hay notificaciones que mostrar.</p>
        ) : (
        notificaciones.map((notificacion) => (
          <div className='container_noti' key={notificacion.id}>
            <div>
                {/* Solo muestra el avatar si esta disponible */}
                {notificacion.avatar && (
                  <img src={notificacion.avatar} alt="Usuario" className="user-avatar" style={{height: '2rem', borderRadius: '2rem', marginTop: '-4px'}}/>
                )}
            </div>
            <div>
              {/* Verifica el tipo de notificación para mostrar el mensaje adecuado */}
              {notificacion.tipo === 'Ticekt Cerrado' ? (
                <p><strong>{notificacion.usuario}</strong>: {notificacion.tipo} - {notificacion.descripcion}</p>
              ) : (
                <p><strong>{notificacion.usuario}</strong>: Respondio a tu ticket</p>
              )}
            </div>
            {/* <p className='text_noti'>{noti.mensaje}</p><hr /> */}
          </div>
        ))
      )}
      </div>        

    </>
  );
}

export default NotificacionesContador;
