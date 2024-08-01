import React from 'react';
import '../misTickets/MisTickets.css'

import Header from '../header/Header';

import { NavLink } from 'react-router-dom';

function MisTickets() {
  return (
    <>

    <div>
        {/* ------------MANDAMOS A LLAMAR LOS COMPONENTES--------------         */}
        <Header/>

        <div className='box_center'>
            <h1 className='p_a m_top c_black text_caption'>Mis tickets</h1>
            <NavLink to="/">
                <p className='boton_Exit pi pi-arrow-circle-left p_a c_red m_top'></p>
                {/* <Button severity="danger" rounded label="Regresar" icon="pi pi-arrow-circle-left" /> */}
            </NavLink>
        </div>
                        
        <div className='box_center m_top_medium'>
                            
            {/*-----------------------TABLA DE TODOS LOS TICKETS---------------------*/}
            <table className="table titulos w-75 table table-bordered mx-auto mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
            </table>

        </div>
                    {/*-----------------------TABLA DE TODOS LOS CLIENTES---------------------*/}

                        {/* <table className="titulos w-75 table table-bordered mx-auto mt-4">
                            <thead className='table-dark'>
                                <tr>
                                    <th className='text-center' scope="col">#</th>
                                    <th className='text-center' scope="col">Nombre</th>
                                    <th className='text-center' scope="col">Apellido Paterno</th>
                                    <th className='text-center' scope="col">Apellido Materno</th>
                                    <th className='text-center' scope="col">correo</th>
                                    <th className='text-center' scope="col">Telefono</th>
                                    <th className='text-center' scope="col">Direccion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(( cliente, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td className='text-center'>{cliente.nombreCliente}</td>
                                    <td className='text-center'>{cliente.apellidoPaternoCliente}</td>
                                    <td className='text-center'>{cliente.apellidoMaterno}</td>
                                    <td className='text-center'>{cliente.correo}</td>
                                    <td className='text-center'>{cliente.telefono}</td>
                                    <td className='text-center'>{cliente.direccion}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table> */}
    </div>
    </>
  );
}

export default MisTickets;
