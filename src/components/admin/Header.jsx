import React, { useState, useEffect, useRef  } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import image from '../../assets/images/logo.png';

import User from '../admin/userIcon/User';
import Nav from '../admin/navbar/Nav';
import Notificaciones from './Notificaciones';

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

        <div className='icon_noti'>
            <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.8rem' }} aria-controls="offcanvasRight" type='button'  onClick={() => setVisibleRight(true)}>
            <Badge severity="danger"></Badge>
            </i>
        </div>

        <div >
          <User/>
        </div>
      </div>

      <div className="card">
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div className='text_positionCenter container_notificaciones'>
                <Notificaciones />
          </div>
        </Sidebar>
      </div>
    </>
  )
}

export default Header;
