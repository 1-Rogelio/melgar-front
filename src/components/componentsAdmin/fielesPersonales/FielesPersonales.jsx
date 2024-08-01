import React, { useState } from 'react';
import '../fielesPersonales/FielesPersonales.css';
import { NavLink } from 'react-router-dom';
import FormClientes from '../formularioClientes/FormClientes';

function FielesPersonales() {
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
        <div className='text_positionCenter m_top text_caption'>
          <h1>Fiel Mark</h1>
          <NavLink to='/'>
            <i className='pi pi-arrow-circle-left icon_exit p_a c_red '></i>
          </NavLink>
        </div>

        <div>
          <table className="text_positionCenter table-responsive table w-75 table table-bordered mx-auto mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">
                  <i className='pi pi-pen-to-square iconEdit' type='button' onClick={handleIconClick}></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
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

export default FielesPersonales;
