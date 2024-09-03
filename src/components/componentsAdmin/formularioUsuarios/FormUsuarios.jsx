import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

import '../formularioUsuarios/FormUsuarios.css';

function FormUsuarios({onClose}) {

  const toast = useRef(null);

  const save = () => {
    toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Datos Guardados' });
  };

  return (
    <>

<center>
      <div className="container_box box_center"> 
        <h2 className='text_positionCenter c_white'>Editar Usuario</h2>     
        <div className='container_form'>
          <form className='m_top'>
            <i className='pi pi-lock p_a iconLock' type='button'></i>
            <div className="inputs_usuarios">
              <div className="form-group caja nombre">
                <label>Nombre(s)</label>
                <input type="text" name="firstName" className="form-control" />
              </div>
              <div className="form-group caja apellido_paterno">
                <label>Apellido Paterno</label>
                <input type="text" name="lastName" className="form-control" />
              </div>
              <div className="form-group caja apellido_materno">
                <label>Apellido Materno</label>
                <input type="text" name="handle" className="form-control" />
              </div>
              <div className="form-group caja email">
                <label>Email</label>
                <input type="text" name="firstName" className="form-control" />
              </div>
              <div className="form-group caja contrasena">
                <label>Contraseña</label>
                <input type="text" name="lastName" className="form-control" />
              </div>
              <div className="form-group caja rol">
                <label>Rol</label>
                <input type="text" name="lastName" className="form-control" />
            </div>
            <div className="form-group caja img">
                <label>Img</label>
                <input type="text" name="lastName" className="form-control" />
            </div>
            <div className="form-group caja activo">
                <label>Activo</label>
                <input type="text" name="lastName" className="form-control" />
            </div>
            </div>
            
          </form>
          <div className='box_center buttons'>
            <button className='btn btn-danger button_cancelar' type="button" onClick={onClose}><label className='pi pi-times'></label> Cancelar</button>
            <Toast ref={toast}></Toast>
            <button className='btn btn-success button_confirm' type="submit" onClick={save}><label className='pi pi-save'></label> Guardar</button>
          </div>
        </div>
      </div>
      </center>
    
    </>
  );
}

export default FormUsuarios;
