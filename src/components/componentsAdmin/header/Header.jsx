import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
// import { Button } from 'primereact/button';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../header/Header.css'
import '../navbar/Nav.css'
import '../../../assets/CSS/main.css'

import image from '../../../assets/images/logo.png';

import User from '../userIcon/User';
import Nav from '../navbar/Nav';

//--------IMPORTAMOS EL NavLink para ocupar el router---------
import { NavLink } from 'react-router-dom';

function Header() {
  
  const [visibleRight, setVisibleRight] = useState(false);               

  return (
    <>
{/* --------------ENCABEZADO Y TITULO---------------------- */}        
      <div className="components_header">

        <div className='icon_melgar'>
          <NavLink to="/">
            <img className='img-fluid iconMelgar' src={image} alt="" />
          </NavLink>
        </div>

        <div className='title_tickets'>
          <h1 className='  text_title text_title_blue'>Tickets</h1>
        </div>

        <div className="box_nav">
          <Nav/>   
        </div> 

        <div className='icon_bell'>
          <i className='pi pi-bell icon_noti' aria-controls="offcanvasRight" type='button'  onClick={() => setVisibleRight(true)}></i>
          {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">99+
          <span className="visually-hidden"></span>
          </span>  */}
        </div>

        <div className="icon_userHeader shadow-2 hover:shadow-8">
          <User/>
        </div>
      </div>

      <div className="card">
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div>
            <h1 className='text_positionCenter text_caption'>Notificaciones</h1>
          </div><hr />
          <div className='text_positionCenter'>
            <p>Notificacion <i className='pi pi-file-pdf sizeIcon'></i></p>
            <p>Notificacion dos <i className='pi pi-file-excel sizeIcon'></i></p>
            <p>Notificacion tres <i className='pi pi-file sizeIcon'></i></p>
          </div>
        </Sidebar>
      </div>
        
    </>
  )
}

export default Header;
