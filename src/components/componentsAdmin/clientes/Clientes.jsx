import React, { useState } from 'react';

import Header from '../header/Header';
// import Nav from '../navbar/Nav';
import FormClientes from '../formularioClientes/FormClientes';

function Clientes() {

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleIconClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
      };

  return (
    <>
    
    <div>
        {/* ------------MANDAMOS A LLAMAR LOS COMPONENTES--------------         */}
        <Header/>

        <h1 className='text_positionCenter text_caption m_top'>Clientes</h1>
            
        <div className='container_tableclientes box_center '>
            {/*-----------------------TABLA DE TODOS LOS TICKETS---------------------*/}
            <table className="tablaClientes table titulos table table-bordered mx-auto mt-4">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    <th className='box_center'>Editar</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td scope="col"><i className='pi pi-pen-to-square icon_edit box_center' type='button' onClick={handleIconClick}></i></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td scope="col"><i className='pi pi-pen-to-square icon_edit box_center' type='button' onClick={handleIconClick}></i></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td >Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@fat</td>
                         <td scope="col"><i className='pi pi-pen-to-square icon_edit box_center' type='button' onClick={handleIconClick}></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        {isFormVisible && (
          <FormClientes onClose={handleCloseForm}/>
        )}
    </div>

    </>
  );
}

export default Clientes;
