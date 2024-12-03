import {React, useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';

import '../header/HeaderAuxiliar.css';
import '../nav/NavAuxiliar.css';

//------------Importamos imagen del logo del avatar-----------------------
import image from '../../../assets/images/logo.png';

//-------------IMPORTAMOS EL NavLink para ocupar el router----------------
import { NavLink } from 'react-router-dom';

//-------------------------IMPORTAMOS COMPONENTES-------------------------
import NavAuxiliar from '../nav/NavAuxiliar';
import Notificaciones from '../../admin/Notificaciones';
import AvatarAuxiliar from '../AvatarAuxiliar';

function HeaderAuxiliar() {

    const [visibleRight, setVisibleRight] = useState(false);
    const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState(0);

  // Función para manejar actualizaciones del número de notificaciones no leídas
  const actualizarNotificacionesNoLeidas = (cantidad) => {
    setNotificacionesNoLeidas(cantidad);
  };

  return (
    <>

    <div className="componentes_header_auxiliares">

      <div className="">
        <NavLink to="/home-auxiliar">
          <img className='img-fluid iconMelgarTrujillo' src={image} alt="" />
        </NavLink>
      </div>

      <div className="titulo_tickets">
        <h1 className='  text_title text_title_blue'>Tickets</h1>
      </div>

      <div className="navbar_auxiliares box_nav">
        <NavAuxiliar/>
      </div>

      <div className="icon_noti">
        <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.8rem' }} aria-controls="offcanvasRight" type='button'  onClick={() => setVisibleRight(true)}>
          {notificacionesNoLeidas > 0 && <Badge value={notificacionesNoLeidas} severity="danger" />}
        </i>
      </div>

      <div>
        <AvatarAuxiliar/>
      </div>

    </div>

    <div className="card">
      <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div className='text_positionCenter container_notificaciones'>
                <Notificaciones onActualizarNoLeidas={actualizarNotificacionesNoLeidas}/>
          </div>
        </Sidebar>
      </div>

    </>
  );
}

export default HeaderAuxiliar;

