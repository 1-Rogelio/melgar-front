import React from 'react';

//--------Importamos imagen de usuario---------------------------
import userImg from '../../../assets/images/usuario.png';

//--------IMPORTAMOS EL NavLink para ocupar el router------------
import { Navigate, NavLink } from 'react-router-dom';

//import { useNavigate } from 'react-router-dom';

function AvatarContador() {
  return (
    <>

    <div>
        {/* --------------------------BOTON de usuario----------------------------------------- */}
          <div className=''>
            <img className="img-fluid" src={userImg} alt={'Photo of '} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"/>
            <p className="nombre_user text_paragraphs c_blue">usuario</p>
            {/* {usuario && <p className="nombre_user text_paragraphs c_blue">{usuario.nombre}</p>} */}
          </div>

            {/* -------------------------VENTANA emergente de configuracion de usuario------------- */} 
              <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                  <h5 id="offcanvasRightLabel" className='titleConf'>Configuración</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">
                  <div className='box_center'>
                    <img className="img-fluid img_user w_short p_a m_top" src={userImg} alt={'Photo of '}/>
                    <h1 className='text_user'>Usuario</h1>
                    {/* <h1 className='text_caption text_user'>{usuario ? usuario.nombre : 'User'}</h1> */}
                  </div><hr />
                    <i className="pi pi-sign-out exitIcon"></i>
                      <NavLink className="cerrarSesionLink text_d_n m_top text_paragraphs_black" to="/login">
                        <center><p>Cerrar Sesión</p></center>
                      </NavLink>
                    <i className="pi pi-spin pi-cog configIcon"></i>
                      <NavLink className='configuracionLink text_d_n text_paragraphs_black' to="/configuracion">
                        <center><p>Configuración</p></center>
                      </NavLink>
                </div>
              </div> 
          </div>
        </>
      );
    }

export default AvatarContador;
