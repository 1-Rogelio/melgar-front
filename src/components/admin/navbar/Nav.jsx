import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../navbar/Nav.css';

//--------IMPORTAMOS EL NavLink para ocupar el router---------
import {NavLink} from 'react-router-dom'

function Nav() {

  return (
    <>
{/* ---------------Nuestra navegación------------- */}
    <div className='container_nav'>
        <nav className='navbar'>
            <NavLink to="/" className="p_rel c_black text_nav">Home</NavLink>
            <NavLink to="/tickets" className='p_rel c_black text_nav'>Crear tickets</NavLink>
            <NavLink to="/todosTickets" className='p_rel c_black text_nav'>Tickets</NavLink>
            <NavLink to="/clientes" className='p_rel c_black text_nav'>Clientes</NavLink>
            <NavLink to="/usuarios" className='p_rel c_black text_nav'>Usuarios</NavLink>
        </nav>
    </div>
    </>
  )
}

export default Nav;
