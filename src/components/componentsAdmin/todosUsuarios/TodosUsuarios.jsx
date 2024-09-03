import React, { useEffect, useState } from 'react';
import '../todosUsuarios/TodosUsuarios.css';

import axios from 'axios';

import Header from '../header/Header';
import FormUsuarios from '../formularioUsuarios/FormUsuarios';

function TodosUsuarios() {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/usuarios')
        .then((response) => {
            setUsuarios(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

   
    const handleIconClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
      };

  return (
    <>
    <div className="container_todos_usuarios">
        <div>
            <Header/>
        </div>

        <h1 className='title_usuarios text_caption'>Todos los usuarios</h1>

        <div className="container_tabla_usuarios">
            <center>
                <table className="table_ticketsTodos table table-bordered text_table">
                    <thead className='table-dark text-center'>
                        <tr>         
                            <th scope="col">Id</th>
                            <th scope="col">Nombre(s)</th>
                            <th scope="col">Apellido Paterno</th>
                            <th scope="col">Apellido Materno</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Img</th>
                            <th scope="col">Activo</th>
                            <th scope='col'>-</th>
                        </tr>
                    </thead>
                            <tbody className='text-center'>
                            {usuarios.map((usuario, index) => (
                        <tr key={index}>       
                            <th>{usuario.id_usuarios}</th>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidoPaterno}</td>
                            <td>{usuario.apellidoMaterno}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.contrasena}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.img}</td>
                            <td>{usuario.activo}</td>
                            <td><i type='button' onClick={handleIconClick} className='pi pi-user-edit' style={{ fontSize: '25px' }}></i></td>
                        </tr>
                          ))}
                            </tbody>
                </table><br /><br />
            </center>
        </div>
        {isFormVisible && (
          <FormUsuarios onClose={handleCloseForm}/>
        )}
    </div>
    </>
  );
}

export default TodosUsuarios;
