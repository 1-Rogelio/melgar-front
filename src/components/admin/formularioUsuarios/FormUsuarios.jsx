import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';

function FormUsuarios({ user, onClose }) {
  const [formData, setFormData] = useState({});
  const toast = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        // nombre: user.nombre || '',
        // apellidoPaterno: user.apellidoPaterno || '',
        // apellidoMaterno: user.apellidoMaterno || '',
        // email: user.email || '',
        rol: user.rol || '',
        // img: img.img || '',
        activo: user.activo || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    axios.patch(`http://localhost:3000/api/v1/usuarios/${user.id_usuarios}`, formData)
    .then(() => {
      toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Datos Guardados' });
      onClose();
    })
    .catch((error) => {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar datos' });
    });
  };

  return (
    <>

<center>
      <div className="container_box box_center"> 
        <h2 className='text_positionCenter c_white'>Editar Usuario</h2>     
        <div className='container_form'>
          <form className='m_top form_editar_usuario'>
            <i className='pi pi-lock p_a iconLock' type='button'></i>
            <div className="inputs_usuarios">
              
              <div className="form-group caja rol">
                <label>Rol</label>
                {/* <input type="select" name="lastName" className="form-control" /> */}
                <select name="rol" className='form-select' value={formData.rol} onChange={handleChange}>
                  <option value="" className='text-center'>Asignar rol</option>
                  <option value="admin">admin</option>
                  <option value="contador">contador</option>
                  <option value="auxiliar">auxiliar</option>
                </select>
            </div>
            <div className="form-group caja activo">
                <label>Activo</label>
                <select name="activo" className='form-select' value={formData.activo} onChange={handleChange}>
                  <option value="" className='text-center'>--</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </select>
            </div>
            </div>
            
          </form>
          <div className='box_center buttons_editar_usuario'>
            <button className='btn btn-danger button_cancelar' type="button" onClick={onClose}><label className='pi pi-times'></label> Cancelar</button>
            <Toast ref={toast}></Toast>
            <button className='btn btn-success button_confirm' type="submit" onClick={handleSave}><label className='pi pi-save'></label> Guardar</button>
          </div>
        </div>
      </div>
      </center>
    
    </>
  );
}

export default FormUsuarios;
