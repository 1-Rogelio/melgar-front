import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../admin/Header';
import FormUsuarios from './formularioUsuarios/FormUsuarios';

function TodosUsuarios() {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Función para obtener la clase CSS del estado (activo/inactivo)
    const getStatusClass = (activo) => {
        return activo === 1 ? 'status-circle active' : 'status-circle inactive';
    };

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/usuarios')
        .then((response) => {
            setUsuarios(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

   
    const handleIconClick = (user) => {
        setSelectedUser(user);
        setIsFormVisible(!isFormVisible);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setSelectedUser(null);
      };

  return (
    <>
    <div className="container_todos_usuarios">
        <div>
            <Header/>
        </div>

        <div className='m_top_f'>
            {isFormVisible && (
            <FormUsuarios user={selectedUser} onClose={handleCloseForm}/>
            )}
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
                            <th scope="col">Correo Electronico</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Rol</th>
                            {/* <th scope="col">Img</th> */}
                            <th scope="col">Activo</th>
                            <th scope='col'>Editar usuario</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {usuarios.map((usuario, index) => (
                        <tr key={index}>       
                            <th>{usuario.id_usuarios}</th>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidoPaterno}</td>
                            <td>{usuario.apellidoMaterno}</td>
                            <td className='text_email'>{usuario.email.length > 15 ? usuario.email.slice(0, 15) + '...' : usuario.email }</td>
                            <td>{usuario.contrasena}</td>
                            <td>{usuario.rol}</td>
                            {/* <td>{usuario.img}</td> */}
                            <td><span className={getStatusClass(usuario.activo)}></span></td>
                            <td><i type='button' onClick={() => handleIconClick(usuario)} className='icon_editar_usuario pi pi-user-edit' style={{ fontSize: '25px' }}></i></td>
                        </tr>
                          ))}
                    </tbody>
                </table><br /><br />
            </center>
        </div>
        
    </div>
    </>
  );
}

export default TodosUsuarios;
