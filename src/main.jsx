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
        
// -----------Importación de Componentes del Usuario Administrador para RUTAS--------------
import Home from './components/componentsAdmin/home/Home'
import CrearTickets from './components/componentsAdmin/crearTickets/CrearTickets'
import TodosTickets from './components/componentsAdmin/todosTickets/TodosTickets'
import Login from './components/componentsAdmin/login/Login'
import ConfigUser from './components/componentsAdmin/configuracionUser/ConfigUser'
import MisTickets from './components/componentsAdmin/misTickets/MisTickets';
import MisFieles from './components/componentsAdmin/misFieles/MisFieles';
import FielesPersonales from './components/componentsAdmin/fielesPersonales/FielesPersonales';
import Clientes from './components/componentsAdmin/clientes/Clientes';
import TodosUsuarios from './components/componentsAdmin/todosUsuarios/TodosUsuarios';

// --------------Importación de Componentes del Usuario para RUTAS-------------------------
import HomeUser from './components/componentsUsers/homeUser/HomeUser';

// -----------Importación de Componentes del Contador para RUTAS-----------------
import HomeContador from './components/componentsContadores/home/HomeContador';
import CrearTicketsContador from './components/componentsContadores/crearTickets/CrearTicketsContador';

// -----------Importación de Componentes del Auxiliar para RUTAS-----------------
import HomeAuxiliar from './components/componentesAuxiliares/homeAuxiliar/HomeAuxiliar';

// ------------------------------React Router------------------------------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//------------Importamos el Layout para el home Y PrivateRoute para proteger rutas---------
import LayoutPublic from './layout/LayoutPublic'
import PrivateRoute from './privateRoute/PrivateRoute'

// ------------------------RUTAS---------------------------
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

      // ------------------RUTAS USER--------------------
      {
        path: '/home-user',
        element: <PrivateRoute element={<HomeUser/>}/>
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
      // ------------------RUTAS Auxiliar--------------------
      {
        path: '/home-auxiliar',
        element: <PrivateRoute element= {<HomeAuxiliar/>}/>
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
