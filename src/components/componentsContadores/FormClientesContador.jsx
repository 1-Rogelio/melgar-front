import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

function FormClientesContador({onClose}) {

    const toast = useRef(null);

    const save = () => {
      toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Datos Guardados' });
    };

  return (
    <>

<center>
      <div className="container_box box_center"> 
        <h2 className='text_positionCenter c_white'>Editar fiel</h2>     
        <div className='container_form'>
          <form className='m_top'>
            <i className='pi pi-lock p_a iconLock' type='button'></i>
            <div className="inputs_datos">
              <div className="form-group caja nombre">
                <label>Nombre</label>
                <input type="text" name="firstName" className="form-control" />
              </div>
              <div className="form-group caja recibe">
                <label>Recibe</label>
                <input type="text" name="lastName" className="form-control" />
              </div>
              <div className="form-group caja rfc">
                <label>RFC</label>
                <input type="text" name="handle" className="form-control" />
              </div>
              <div className="form-group caja apellido">
                <label>Apellido</label>
                <input type="text" name="firstName" className="form-control" />
              </div>
              <div className="form-group caja fiel">
                <label>Fiel</label>
                <input type="text" name="lastName" className="form-control" />
              </div>
            </div><hr />

            <div className="inputs_domicilio">
              <div className="form-group caja calle">
                <label>Calle</label>
                <input type="text" name="handle" className="form-control" />
              </div>
              <div className="form-group caja numeroExt">
                <label>Numero Ext</label>
                <input type="text" name="firstName" className="form-control" />
              </div>
              <div className="form-group caja numeroInt">
                <label>NumeroInt</label>
                <input type="text" name="lastName" className="form-control" />
              </div>
              <div className="form-group caja x">
                <label>Calle</label>
                <input type="text" name="handle" className="form-control" />
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

export default FormClientesContador;
