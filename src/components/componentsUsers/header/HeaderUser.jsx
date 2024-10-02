import {React, useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';


import '../header/HeaderUser.css';
import '../nav/NavUser.css';

//------------Importamos imagen del logo del avatar-----------------------
import image from '../../../assets/images/logo.png';

//-------------IMPORTAMOS EL NavLink para ocupar el router----------------
import { NavLink } from 'react-router-dom';

//-------------------IMPORTAMOS COMPONENTES-------------------
import NavUser from '../nav/NavUser';
import AvatarUser from '../AvatarUser'

function HeaderUser() {

    const [visibleRight, setVisibleRight] = useState(false);

  return (
    <>
    
    <div className="componentes_header_user">

      <div className="">
        <NavLink to="/home-user">
          <img className='img-fluid iconMelgarTrujillo' src={image} alt="" />
        </NavLink>
      </div>

      <div className="titulo_tickets">
        <h1 className='  text_title text_title_blue'>Tickets</h1>
      </div>

      <div className="navbar_user box_nav">
        <NavUser/>
      </div>

      <div className="icon_noti">
        <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.8rem' }} aria-controls="offcanvasRight" type='button'  onClick={() => setVisibleRight(true)}>
          <Badge severity="danger"></Badge>
        </i>
      </div>

      <div>
        <AvatarUser/>
      </div>

    </div>

    <div className="card">
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div>
            <h1 className='text_positionCenter text_caption'>Notificaciones</h1>
          </div><hr />

          {/* <div className='text_positionCenter'>
            {notificaciones.length > 0 ? (
              notificaciones.map((noti, index) => (
                <div key={index} className='notificaciones'>
                  <h1 className='title_noti'>{noti.titulo}</h1>
                  <p className='text_noti'>{noti.descripcion} <i className='pi pi-file-pdf sizeIcon'></i></p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No tienes notificaciones</p>
            )}
          </div> */}
        </Sidebar>
      </div>
    
    </>
  );
}

export default HeaderUser;
