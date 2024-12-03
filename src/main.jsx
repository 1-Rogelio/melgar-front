//-----------------IMPORTACION DE REACT Y REACT DOM-----------------
import React from 'react'
import ReactDOM from 'react-dom/client'

//----------------------Styles Bootstrap 5--------------------------
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './assets/CSS/main.css'

//------------------Styles PrimeReact y PrimeFlex-------------------
import "../node_modules/primereact/resources/themes/lara-light-cyan/theme.css";
import '../node_modules/primeicons/primeicons.css';
import "../node_modules/primeflex/primeflex.css";
        
// -----------Componentes del Usuario ADMINISTRADOR para RUTAS--------------
import Home from './components/admin/home/Home'
import CrearTickets from './components/admin/CrearTickets'
import TodosTickets from './components/admin/todosTickets/TodosTickets'
import Login from './components/admin/login/Login'
import ConfigUser from './components/admin/ConfigUser'
import MisTickets from './components/admin/MisTickets';
import MisFieles from './components/admin/MisFieles';
import FielesPersonales from './components/admin/FielesPersonales';
import Clientes from './components/admin/Clientes';
import TodosUsuarios from './components/admin/TodosUsuarios';
import VerTickets from './components/admin/VerTickets';
import Form_Reenviar from './components/admin/Form_Reenviar';

// --------------Importación de Componentes del Usuario para RUTAS-------------------------
import HomeUser from './components/componentsUsers/home/HomeUser';
// import SobreLaApi from './components/componentsUsers/SobreLaApi';
import CrearTicketsInfo from './components/componentsUsers/CrearTicketsInfo';
import Seguimiento from './components/componentsUsers/Seguimiento';


// -----------Importación de Componentes del Contador para RUTAS-----------------
import HomeContador from './components/componentsContadores/home/HomeContador';
import CrearTicketsContador from './components/componentsContadores/CrearTicketsContador';
import ClientesContadores from './components/componentsContadores/ClientesContadores';
import ConfigContador from './components/componentsContadores/ConfigContador';
import MisFielesContador from './components/componentsContadores/MisFielesContador';
import MisTicketsContador from './components/componentsContadores/MisTicketsContador';
import VerTicketsContador from './components/componentsContadores/VerTicketsContador';

// -----------Importación de Componentes del Auxiliar para RUTAS-----------------
import HomeAuxiliar from './components/componentesAuxiliares/home/HomeAuxiliar';
import CrearTicketsAuxiliar from './components/componentesAuxiliares/CrearTicketsAuxiliar';
import ConfigAuxiliar from './components/componentesAuxiliares/ConfigAuxiliar';
import MisTicketsAuxiliar from './components/componentesAuxiliares/MisTicketsAuxiliar';
import ConvertirImgAuxiliar from './components/componentesAuxiliares/ConvertirImgAuxiliar';
import VerTicketsAuxiliar from './components/componentesAuxiliares/VerTicketsAuxiliar';

// ------------------------------React Router------------------------------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//------------Importamos el Layout para el home Y PrivateRoute para proteger rutas---------
import LayoutPublic from './layout/LayoutPublic'
import PrivateRoute from './privateRoute/PrivateRoute'

// ------------------------RUTAS ADMINISTRADOR---------------------------
const router = createBrowserRouter([
  {   
    path: '/',
    element: <LayoutPublic/>,
    children:[
      {
        index: true,
        element: <PrivateRoute element={<Home/>} />,
      },
      {
        path: '/tickets',
        element: <PrivateRoute element={<CrearTickets/>} />,
      },
      {
        path: '/todosTickets',
        element: <PrivateRoute element={<TodosTickets/>} />,
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/configuracion',
        element: <PrivateRoute element={<ConfigUser/>} />,
      },
      {
        path: '/mis-tickets',
        element: <PrivateRoute element={<MisTickets/>} />,
      },
      {
        path: '/mis-fieles',
        element: <PrivateRoute element={<MisFieles/>} />,
      },
      {
        path: '/fieles',
        element: <PrivateRoute element={<FielesPersonales/>} />,
      },
      {
        path: '/clientes',
        element: <PrivateRoute element={<Clientes/>} />,
      },
      {
        path: '/usuarios',
        element: <PrivateRoute element={<TodosUsuarios/>}/>
      },
      {
        path: '/ver-mas-tickets/:id_tickets',
        element: <PrivateRoute element={<VerTickets/>}/>
      },
      {
        path: '/responder-ticket',
        element: <PrivateRoute element={<Form_Reenviar/>}/>
      },

      // ------------------RUTAS USER--------------------
      {
        path: '/home-user',
        element: <PrivateRoute element={<HomeUser/>}/>
      },
      // {
      //   path: '/sobre-la-api',
      //   element: <PrivateRoute element={<SobreLaApi/>}/>
      // },
      {
        path: '/crear-tickets-info',
        element: <PrivateRoute element={<CrearTicketsInfo/>}/>
      },
      {
        path: '/seguimiento',
        element: <PrivateRoute element={<Seguimiento/>}/>
      },
      
      // ------------------RUTAS CONTADOR--------------------
      {
        path: '/home-contador',
        element: <PrivateRoute element={<HomeContador/>} />
      },
      {
        path: '/crear-tickets',
        element: <PrivateRoute element={<CrearTicketsContador/>}/>
      },
      {
        path: '/clientes-contadores',
        element: <PrivateRoute element={<ClientesContadores/>}/>
      },
      {
        path: '/configuracion-contador',
        element: <PrivateRoute element={<ConfigContador/>}/>
      },
      {
        path: '/mis-fieles-contador',
        element: <PrivateRoute element={<MisFielesContador/>}/>
      },
      {
        path: '/mis-tickets-contador',
        element: <PrivateRoute element={<MisTicketsContador/>}/>
      },
      {
        path: '/ver-mas-tickets-contador/:id_tickets',
        element: <PrivateRoute element={<VerTicketsContador/>}/>
      },
      // ------------------RUTAS AUXILIAR--------------------
      {
        path: '/home-auxiliar',
        element: <PrivateRoute element= {<HomeAuxiliar/>}/>
      },
      {
        path: '/crear-tickets-auxiliar',
        element: <PrivateRoute element= {<CrearTicketsAuxiliar/>}/>
      },
      {
        path: '/configuracion-auxiliar',
        element: <PrivateRoute element={<ConfigAuxiliar/>}/>
      },
      {
        path: '/mis-tickets-auxiliar',
        element: <PrivateRoute element={<MisTicketsAuxiliar/>}/>
      },
      {
        path: '/ver-mas-tickets-auxiliar/:id_tickets',
        element: <PrivateRoute element={<VerTicketsAuxiliar/>}/>
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
