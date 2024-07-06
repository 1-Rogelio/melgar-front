import React from 'react'
import ReactDOM from 'react-dom/client'

// ---------Importación de Componentes-----------------
import Home from './components/componentsAdmin/home/Home'
import CrearTickets from './components/componentsAdmin/crearTickets/CrearTickets'
import TodosTickets from './components/componentsAdmin/todosTickets/TodosTickets'


// ------------React Router--------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LayoutPublic from './layout/LayoutPublic'

// --------------Rutas-----------------
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
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
