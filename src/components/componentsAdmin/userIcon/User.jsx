import './User.css'
import user from '../../../assets/images/usuario.png';

import { NavLink } from 'react-router-dom';

function User({ imageUrl, onClick }) {

    const usuario = {
        name: 'Usuario',
    
    }

    return(
        <>

        <div className="image-button" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img className='img-fluid avatar' src={user} alt={'Photo of '+usuario.name} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" />
            <p className='text-center usuarioName'>{usuario.name}</p>
        </div> 
        
         {/* <button className="botonUser btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">x</button> */}

         <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">Configuración</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <img className='avatarConfig img-fluid' src={user} alt={'Photo of '+usuario.name} />
                <center><h1 className='userTitle'>User</h1><hr /></center>
                <i class="exit fa-solid fa-arrow-right-to-bracket"></i>
                <NavLink to="">
                    <center><p className='cerrarSesion'>Cerrar Sesión</p></center>
                </NavLink>
                <i class="config fa-solid fa-gear"></i>
                <NavLink>
                    <center><p>Configuración</p></center>
                </NavLink>
                {/* <NavLink to="/login">
                    <button>Iniciar Sesión</button>
                </NavLink>
                <button>Cerrar Sesión</button> */}
            </div>
         </div> 

        </>
    )
    
}

export default User;