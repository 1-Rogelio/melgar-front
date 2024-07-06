import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Header.css'
import image from '../../../assets/images/logo.png';

// Importar componentes
import Nav from '../navbar/Nav';
import User from '../userIcon/User';

import { NavLink } from 'react-router-dom';

function Header() {

  return (
    <>

    <div className="container">
        <NavLink to="/">
         <img className='img-fluid image' src={image} alt="" />
        </NavLink>
        <h1 className='title'>MELGAR TRUJILLO Y CIA SC</h1>
        <User/>
    </div><hr />
    <Nav/>
    </>
  )
}

export default Header;
