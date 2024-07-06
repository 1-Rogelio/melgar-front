import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


//Importar componentes
import Nav from '../../componentsAdmin/navbar/Nav';
import Header from '../header/Header';
import FielesHome from '../../componentsAdmin/fielesHome/FielesHome';
import TusTickets from '../tusTickets/TusTickets';
import NotificacionesHome from '../notificacionesHome/NotificacionesHome';

function Home() {

  return (
     <>
     <Header/>
     <Nav/>
     <FielesHome/>
     <TusTickets/>
     <NotificacionesHome/>
     </>
   )
}

export default Home;
