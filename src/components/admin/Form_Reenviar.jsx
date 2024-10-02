import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Editor } from "primereact/editor";
import { Toast } from 'primereact/toast';
import { NavLink } from "react-router-dom";
import axios from "axios";

function Form_Reenviar() {

  const [selectedDestinatario, setSelectedDestinatario] = useState(null);
  const [destinatarios, setDestinatarios] = useState([]);
  const [solicitante, setSolicitante] = useState('');
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const toast = useRef(null);

  const fetchDestinatarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/usuarios/buscador');
      setDestinatarios(response.data);
    } catch (error) {
      console.error('Error fetching destinatarios');
    }
  };

  useEffect(() => {
    fetchDestinatarios();
  }, []);

  const destinatarioOptionTemplate = option => {
    return(
      <div>
        {option.nombre} {option.apellidoPaterno} {option.apellidoMaterno}
      </div>
    )
  }

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/tickets', {
        solicitante,
        destinatario: selectedDestinatario ? selectedDestinatario.id_usuarios : null,
        asunto,
        descripcion,
        tipo
      });
      toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Datos Guardados' });
      //Limpiar datos al enviar
      setSolicitante('');
      setDestinatarios('');
      setAsunto('');
      setDescripcion('');
      setTipo('');
    } catch (error) {
      console.error('Error al guardar ticket');
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar los datos' });
    }
  };

  return (
    <>

<div className='container_all clearfix container_responder_tickets'>
        {/* -----------Mandamos a llamar los componentes a ocupar-------- */}     

          {/* ----------------FORMULARIO---------------- */}
          <div className="container_Tickets form_container_responder_tickets bg_nav">
                <NavLink to="/mis-tickets">
                    <p className='boton_Exit pi pi-arrow-circle-left c_red' style={{marginLeft:'-8rem', marginTop:'0.5rem'} }></p>
                    {/* <Button severity="danger" rounded label="Regresar" icon="pi pi-arrow-circle-left" /> */}
                </NavLink>

            <form>
                <div>
                  <h1 className="titulo_Ticket text_positionCenter c_white">Responder tickets</h1><hr />
                </div>

                <div className="container_boxTickets box_responder_tickets">
                    
                    <div className="solicitante_destinatario">
                      <div className="solicitante cajas_form">
                        <label className="text_global">Solicitante</label>
                        <input type="text" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} className="form-control text-center input_solicitante" style={{height: '2rem'}} placeholder="Escribe tu nombre"/>
                      </div>
                      <div className="destinatario cajas_form">
                          <Dropdown value={selectedDestinatario} onChange={(e) => setSelectedDestinatario(e.value)} options={destinatarios} optionLabel={(option) => `${option.nombre} ${option.apellidoPaterno} ${option.apellidoMaterno}`} optionValue="id_usuarios" placeholder="Selecciona un destinatario" 
                          filter itemTemplate={destinatarioOptionTemplate} className="w-full md:w-15rem"/> 
                      </div>
                    </div>

                    <div className="asunto_descripcion">
                      <div className="asunto cajas_form">
                        <FloatLabel>
                          <InputTextarea value={asunto} onChange={(e) => setAsunto(e.target.value)} rows={4} cols={80} />
                          <label className="pi pi-file"> Asunto</label>
                        </FloatLabel>
                      </div>
                      {/* <div className="descripcion cajas_form">
                        <FloatLabel>
                          <InputTextarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={4} cols={40} />
                          <label htmlFor="descripcion" className="pi pi-file-edit"> Descripcion</label>
                        </FloatLabel>
                      </div> */}
                    </div>

                    <div className="editor cajas_form">
                        <Editor value={descripcion} onTextChange={(e) => setDescripcion(e.textValue)} style={{ height: '200px' }}/>
                    </div>

                    <center>
                      <div className="tipo cajas_form flex_buttons_cerrar">
                        <label className="tipo_text tipo_responder m_left_medium text_global" htmlFor="">Tipo</label>
                        {/* <input className="" value={tipo} onChange={(e) => setTipo(e.target.value)} type="text" /> */}
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-select tipo_responder">
                          <option value="" className='text-center'>--</option>
                          <option value="Contable">Contable</option>
                          <option value="Tecnico">Tecnico</option>
                          <option value="Respuesta">Respuesta</option>
                        </select>
                        <div className="flex_buttons_cerrar">
                            {/* <div>
                                <label className="text_global">Cerrar</label>
                                <input required placeholder="ddsss" type="radio" />
                            </div> */}
                            <div>
                                <button type="button" className="boton_enviar col-md-5 offset-md-4 btn bg_green" data-bs-toggle="modal"
                                data-bs-target="#exampleModal"><label className='pi pi-check'></label>Enviar</button>
                            </div>
                        </div>
                      </div>
                    </center>    
                </div> 

                
              
              
              {/* ----------------------------------Boton de confirmar----------------------------- */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        ¿Los datos están correctos?
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">Si es así, haga clic en enviar</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><label className='pi pi-times'></label> Cancelar</button>
                      <Toast ref={toast}></Toast>
                      <button type="button" onClick={handleSubmit} className="btn btn-success" icon="pi pi-check"><label className='pi pi-check'></label> Sí, enviar</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
      </div>


    {/* <center>
        <div className="container_responder_ticket">
            <div className="container_form_responder">
                <div>
                    <h1 className='text_positionCenter text_caption'>Responder Ticket</h1>
                </div><hr />

                <div className='columOne'>
                    <div>
                        <div>
                            <label className='text_global'>Solicitante</label>
                        </div>
                        <input className='form-control' type="text" />
                    </div>

                    <div>
                        <div>
                            <label className='text_global' htmlFor="">Destinatario</label>
                        </div>
                        <input className='form-control' type="text" />
                    </div>

                    <div>
                        <div>
                            <label className='text_global fechass' htmlFor="">Fecha de creación</label>
                        </div>
                        <input className='form-control' type="text" />
                    </div>
                </div>

            </div>
        </div>
    </center> */}

    </>
  );
}

export default Form_Reenviar;
