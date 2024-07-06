import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../navbar/Nav.css';


import {NavLink} from 'react-router-dom'

function Nav() {

  return (
    <>
    <div className='heider'>
        <nav className='navbar'>
            <NavLink to="/" className="active">Home</NavLink>
            <NavLink to="/tickets">Tickets</NavLink>
            <NavLink to="/todosTickets">Todos los tickets</NavLink>
        </nav>
    </div>
    </>
  )
}

export default Nav;
