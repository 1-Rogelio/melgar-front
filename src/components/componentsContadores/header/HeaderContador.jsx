import {React, useState, useEffect} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';

import '../header/HeaderContador.css';
import '../navbar/NavContador.css';

//------------Importamos imagen del logo del avatar-----------------------
import image from '../../../assets/images/logo.png';

//-------------IMPORTAMOS EL NavLink para ocupar el router----------------
import { NavLink } from 'react-router-dom';

//-------------------IMPORTAMOS COMPONENTES-------------------
import NavContador from '../navbar/NavContador';
import AvatarContador from '../AvatarContador';
import Notificaciones from '../../admin/Notificaciones';

function HeaderUser() {

  const [visibleRight, setVisibleRight] = useState(false);

  return (
    <>

    <div className="componentes_header_contadores">

      <div className="">
        <NavLink to="/home-contador">
          <img className='img-fluid iconMelgarTrujillo' src={image} alt="" />
        </NavLink>
      </div>

      <div className="titulo_tickets">
        <h1 className='  text_title text_title_blue'>Tickets</h1>
      </div>

      <div className="navbar_contadores box_nav">
        <NavContador/>
      </div>

      <div className='icon_noti'>
            <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.8rem' }} aria-controls="offcanvasRight" type='button'  onClick={() => setVisibleRight(true)}>
            <Badge severity="danger"></Badge>
            </i>
      </div>

      <div >
        <AvatarContador/>
      </div>

    </div>

    <div className="card">
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div className='text_positionCenter container_notificaciones'>
                <Notificaciones/>
          </div>
        </Sidebar>
      </div>

    </>
  );
}

export default HeaderUser;
