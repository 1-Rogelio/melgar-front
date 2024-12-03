import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../socket';

function Notificaciones({ onActualizarNoLeidas }) {
  const [notificaciones, setNotificaciones] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/notificaciones/ver-notificacion-usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotificaciones(response.data);
        // Filtrar notificaciones no leídas y actualizar el estado en el componente padre
        const noLeidas = response.data.filter((n) => !n.leida).length;
        onActualizarNoLeidas(noLeidas);
      } catch (error) {
        console.error("Error al obtener las notificaciones: ", error);
      }
    };

    // Llama a la función para obtener las notificaciones
    fetchNotificaciones();

    // Registrar al usuario en el room de su ID (userId debe estar definido)
    socket.emit('registrarUsuario', userId);

    // Escuchar eventos de nuevas notificaciones
    socket.on('nuevaNotificacion', (nuevaNotificacion) => {
      setNotificaciones(prevNotificaciones => [...prevNotificaciones, nuevaNotificacion]);
    });

    socket.on('ticketCreado', (notificacion) => {
      ssetNotificaciones((prevNotificaciones) => {
        const actualizadas = [notificacion, ...prevNotificaciones];
        const noLeidas = actualizadas.filter((n) => !n.leida).length;
        onActualizarNoLeidas(noLeidas);
        return actualizadas;
      });
    });
  
    socket.on('ticketCerrado', (notificacion) => {
      setNotificaciones((prevNotificaciones) => {
        const actualizadas = [notificacion, ...prevNotificaciones];
        const noLeidas = actualizadas.filter((n) => !n.leida).length;
        onActualizarNoLeidas(noLeidas);
        return actualizadas;
      });
    });
  

    // Limpiar el efecto al desmontar el componente
    return () => {
      socket.off('nuevaNotificacion');
      socket.off('ticketCreado');
      socket.off('ticketCerrado');
    };
  }, [userId, token, onActualizarNoLeidas]);

  // const marcarComoLeida = async (id_notificaciones) => {
  //   try {
  //     await axios.patch(`http://localhost:3000/api/v1/notificaciones/ver-notificacion-usuario/${id_notificaciones}`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     setNotificaciones(notificaciones.map(notificacion => {
  //       notificacion.id_notificaciones === id_notificaciones ? { ...notificacion, leida: true } : notificacion
  //     }));
  //   } catch (error) {
  //     console.error("Error al marcar la notificación como leída: ", error);
  //   }
  // }

  return (
    <div className="container_notificaciones">
      <div>
        <h1 className='text_positionCenter text_caption'>Notificaciones</h1>
      </div>
      <hr />

      <div className="notificaciones">
        {notificaciones.length === 0 ? (
          <p>No hay notificaciones.</p>
        ) : (
          notificaciones.map((notificacion, index) => (
            <div key={index} className={`notificacion ${notificacion.leida ? 'leida' : 'nueva'}`}>
              {/* Información del solicitante */}
              <div className="notificacion_usuario">
                {/* <div>
                  <img 
                    src={notificacion.UsuarioSolicitante.Solicitante.img} 
                    alt="Avatar Solicitante" 
                    className="avatar_notificacion" 
                  />
                </div> */}
                {/* <div>
                  <p><strong>{notificacion.UsuarioSolicitante.Solicitante.nombre} {notificacion.UsuarioSolicitante.Solicitante.apellidoPaterno}</strong></p>
                </div> */}
                <div>
                  <small>
                  {(() => {
                      const fecha = new Date(notificacion.fecha_notificacion);
                      let horas = fecha.getHours();
                      const minutos = fecha.getMinutes().toString().padStart(2, '0');
                      const amPm = horas >= 12 ? 'PM' : 'AM';

                      // Convertir a formato de 12 horas
                      horas = horas % 12 || 12;

                      return `${horas}:${minutos} ${amPm}`;
                    })()}
                  </small>
                </div>
              </div>

              {/* Información de la notificación */}
              <div className='container_body_notificaciones'>
               
                  <p><strong></strong> {notificacion.tipo}, {notificacion.mensaje}</p>
              
               
                  {/* <p className='mensaje_notificacion'>{notificacion.mensaje}</p> */}
                
              </div>
              {/* <p className='mensaje_notificacion'>{notificacion.mensaje}</p> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notificaciones;
