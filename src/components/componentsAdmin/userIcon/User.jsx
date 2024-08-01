import '../userIcon/User.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//--------Importamos imagen de usuario---------------------------
import user from '../../../assets/images/usuario.png';

//--------IMPORTAMOS EL NavLink para ocupar el router------------
import { NavLink } from 'react-router-dom';

function User() {

    const usuario = {
        // name: 'User',
    }

    return(
        <>

        <div>
            {/* --------------------------BOTON de usuario----------------------------------------- */}
            <div className=''>
                <img className="img-fluid" src={user} alt={'Photo of '+usuario.name} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"/>
                <p className="text_paragraphs box_center">{usuario.name}</p>
            </div>

            {/* -------------------------VENTANA emergente de configuracion de usuario------------- */} 
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel" className='titleConf'>Configuración</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='box_center'>
                        <img className="img-fluid w_short p_a m_top" src={user} alt={'Photo of '+usuario.name} />
                        <h1 className="m_top_standard text_positionCenter userText">User</h1>
                    </div><hr />
                    <i className="pi pi-sign-out exitIcon"></i>
                    <NavLink className="cerrarSesionLink text_d_n m_top text_paragraphs_black" to="/login">
                        <center><p >Cerrar Sesión</p></center>
                    </NavLink>
                    <i className="pi pi-spin pi-cog configIcon"></i>
                    <NavLink className='configuracionLink text_d_n text_paragraphs_black' to="/configuracion">
                        <center><p>Configuración</p></center>
                    </NavLink>
                    {/* <NavLink to="/login">
                        <button>Iniciar Sesión</button>
                    </NavLink>
                    <button>Cerrar Sesión</button> */}
                </div>
            </div> 
        </div>

        </>
    )
    
}

export default User;