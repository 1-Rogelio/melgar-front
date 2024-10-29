import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import Header from '../admin/Header';
import FormUsuarios from './formularioUsuarios/FormUsuarios';

function TodosUsuarios() {

    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const toast = useRef(null); // Para mostrar notificaciones

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
        setIsDialogVisible(true);
    };

    const handleCloseDialog = () => {
        setIsDialogVisible(false);
        setSelectedUser(null);
    };

    const handleSave = () => {
        axios.patch(`http://localhost:3000/api/v1/usuarios/${selectedUser.id_usuarios}`, {
            rol: selectedUser.rol,
            activo: selectedUser.activo
        })
        .then(() => {
            toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Datos Guardados' });
            handleCloseDialog();
            // Actualiza la lista de usuarios después de guardar
            setUsuarios((prev) => prev.map((user) => user.id_usuarios === selectedUser.id_usuarios ? selectedUser : user));
        })
        .catch((error) => {
            console.error(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar datos' });
        });
    };

  return (
    <>
    <div className="container_todos_usuarios">
                <div>
                    <Header/>
                </div>

                <Toast ref={toast} />

                <h1 className='title_usuarios text_caption'>Todos los usuarios</h1>

                <div className="container_tabla_usuarios">
                    <center>
                        <table className="table_usuariosTodos table table-bordered text_table_usuarios">
                            <thead className='table-dark text-center'>
                                <tr>         
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre(s)</th>
                                    <th scope="col">Apellido Paterno</th>
                                    <th scope="col">Apellido Materno</th>
                                    <th scope="col">Correo Electronico</th>
                                    <th scope="col">Rol</th>
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
                                        <td className='text_email'>{usuario.email.length > 20 ? usuario.email.slice(0, 20) + '...' : usuario.email }</td>
                                        <td>{usuario.rol}</td>
                                        <td><span className={getStatusClass(usuario.activo)}></span></td>
                                        <td>
                                            <i 
                                                type='button' 
                                                onClick={() => handleIconClick(usuario)} 
                                                className='icon_editar_usuario pi pi-user-edit' 
                                                style={{ fontSize: '25px' }} 
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br /><br />
                    </center>
                </div>

                <Dialog 
                    className='modal_editar_usuario'
                    header="Editar Usuario" 
                    visible={isDialogVisible} 
                    onHide={handleCloseDialog}
                    
                >
                    {selectedUser && (
                        <div className='form_editar_usuarios'>
                            <div className="form-group">
                                <label>Rol</label>
                                <select 
                                    name="rol" 
                                    className='form-select' 
                                    value={selectedUser.rol} 
                                    onChange={(e) => setSelectedUser({ ...selectedUser, rol: e.target.value })}
                                >
                                    <option value="" className='text-center'>Asignar rol</option>
                                    <option value="admin">admin</option>
                                    <option value="contador">contador</option>
                                    <option value="auxiliar">auxiliar</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Activo</label>
                                <select 
                                    name="activo" 
                                    className='form-select' 
                                    value={selectedUser.activo} 
                                    onChange={(e) => setSelectedUser({ ...selectedUser, activo: e.target.value })}
                                >
                                    <option value="" className='text-center'>--</option>
                                    <option value="1">1</option>
                                    <option value="0">0</option>
                                </select>
                            </div>
                            <div className='buttons_edit_users'>
                                <button className='btn btn-danger' type="button" onClick={handleCloseDialog}>
                                    <label className='pi pi-times'></label> Cancelar
                                </button>
                                <button className='btn btn-success' type="button" onClick={handleSave}>
                                    <label className='pi pi-save'></label> Guardar
                                </button>
                            </div>
                        </div>
                    )}
                </Dialog>
            </div>
    </>
  );
}

export default TodosUsuarios;
