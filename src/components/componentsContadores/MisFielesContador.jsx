import React from 'react';

import HeaderContadores from '../componentsContadores/header/HeaderContador';

import { NavLink } from 'react-router-dom';

function MisFielesContador() {
  return (
    <>

<div>
        {/* ------------MANDAMOS A LLAMAR LOS COMPONENTES--------------         */}
        <HeaderContadores/>
            
            
        <div className='box_center'>
            <h1 className='p_a m_top c_black text_caption'>Mis Fieles</h1>
            <NavLink to="/home-contador">
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
                        <td >Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@fat</td>
                    </tr>
                </tbody>
            </table>
        </div>        
    </div>

    </>
  );
}

export default MisFielesContador;
