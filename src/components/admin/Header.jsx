import React, { useState, useEffect  } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';
import axios from 'axios';
import { Button } from 'primereact/button';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import image from '../../assets/images/logo.png';

import User from '../admin/userIcon/User';
import Nav from '../admin/navbar/Nav';

//--------IMPORTAMOS EL NavLink para ocupar el router---------
import { NavLink } from 'react-router-dom';

function Header() {
  const [visibleRight, setVisibleRight] = useState(false);
  // const [notificaciones, setNotificaciones] = useState([]);
  
  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');
  //   if (userId) {
  //     fetchNotificaciones(userId);
  //   }
  // }, []);

  // const fetchNotificaciones = async (userId) => {
  //   try {
  //     console.log('UserId:', userId);
  //     const response = await axios.get(`http://localhost:3000/api/v1/notificaciones/usuarios/${userId}`);
  //     //const response = await axios.get('http://localhost:3000/api/v1/notificaciones/usuarios/',userId);
  //     setNotificaciones(response.data);
  //   } catch (error) {
  //     console.error('Error al obtener las notificaciones', error);
  //   }
  // };

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

        {/* <div className='icon_noti'>
          <i className='pi pi-bell' aria-controls="offcanvasRight" type='button'  onClick={() => setVisibleRight(true)}></i>
          <span className="spanNum position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">99+
          <span className="visually-hidden"></span>
          </span> 
        </div> */}

        <div >
          <User/>
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
  )
}

export default Header;
