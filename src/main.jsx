import React from 'react'
import ReactDOM from 'react-dom/client'

//-------------Styles Bootstrap 5----------------- 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

//-------------Styles PrimeReact y PrimeFlex---------------
import "../node_modules/primereact/resources/themes/lara-light-cyan/theme.css";
import '../node_modules/primeicons/primeicons.css';
import "../node_modules/primeflex/primeflex.css";
        
// -----------Importación de Componentes para RUTAS-----------------
import Home from './components/componentsAdmin/home/Home'
import CrearTickets from './components/componentsAdmin/crearTickets/CrearTickets'
import TodosTickets from './components/componentsAdmin/todosTickets/TodosTickets'
import Login from './components/componentsAdmin/login/Login'
import ConfigUser from './components/componentsAdmin/configuracionUser/ConfigUser'
import MisTickets from './components/componentsAdmin/misTickets/MisTickets';
import MisFieles from './components/componentsAdmin/misFieles/MisFieles';
import FielesPersonales from './components/componentsAdmin/fielesPersonales/FielesPersonales';
import Clientes from './components/componentsAdmin/clientes/Clientes';

// ------------React Router--------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//-------------Importamos el Layout------
import LayoutPublic from './layout/LayoutPublic'

// ---------------Rutas------------------
const router = createBrowserRouter([
  {   
    path: '/',
    element: <LayoutPublic/>,
    children:[
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/tickets',
        element: <CrearTickets/>,
      },
      {
        path: '/todosTickets',
        element: <TodosTickets/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/configuracion',
        element: <ConfigUser/>
      },
      {
        path: '/mis-tickets',
        element: <MisTickets/>
      },
      {
        path: '/mis-fieles',
        element: <MisFieles/>
      },
      {
        path: '/fieles',
        element: <FielesPersonales/>
      },
      {
        path: '/clientes',
        element: <Clientes/>
      },
      
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
