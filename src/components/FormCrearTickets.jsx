import React from "react";
//import { Editor } from "primereact/editor";

import '../components/FormCrearTickets.css';

//---------------Editor----------------
//const [text, setText] = useState('');

function FormCrearTickets() {
  return (
    <>
    
    <div className='container_all clearfix '>
        {/* -----------Mandamos a llamar los componentes a ocupar-------- */}     

          {/* ----------------FORMULARIO---------------- */}
          <div className="container_Tickets bg_nav">
            <form>
                <div>
                  <h1 className="titulo_Ticket text_positionCenter c_white">Generar tickets</h1><hr />
                </div>

                <div className="container_boxTickets">
                    
                    <div className="solicitante_destinatario">
                      <div className="solicitante cajas_form">
                        <i className="pi pi-user" style={{fontSize: '17px'}}></i> <label> Solicitante</label>
                        <input required className="input_tickets" />
                      </div>
                      <div className="destinatario cajas_form">
                        <label htmlFor="">destinatario</label>
                        <input className="form-control" type="text" placeholder="destinatario"/>
                          {/* <label className="icon_arrow pi pi-arrow-right"></label> */}
                      </div>
                    </div>

                    {/* <div className="asunto_descripcion">
                      <div className="asunto cajas_form">
                        <label htmlFor="">asunto</label>
                        <input className="form-control inputs_sd" type="text" placeholder="asunto"/>
                      </div>
                      <div className="descripcion cajas_form">
                        <label htmlFor="">descripcion</label>
                        <input className="form-control inputs_sd" type="text" placeholder="descripcion"/>
                      </div>
                    </div> */}

                    {/* <div className="editor cajas_form">
                        <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '200px' }}/>
                    </div> */}

                    {/* <center>
                      <div className="tipo cajas_form">
                      <label htmlFor="">descripcion</label>
                        <input className="form-control" type="text" placeholder="descripcion"/>
                        <button type="button" className="boton_enviar col-md-5 offset-md-4 btn bg_green" data-bs-toggle="modal"
                data-bs-target="#exampleModal"><label className='pi pi-check'></label>Enviar</button>
                      </div>
                    </center> */}         

                </div>

                
              
              
              {/* ----------------------------------Boton de confirmar----------------------------- */}
              {/* <div
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
                      <button type="button" className="btn btn-success" icon="pi pi-check" onClick={save}><label className='pi pi-check'></label> Sí, enviar</button>
                    </div>
                  </div>
                </div>
              </div> */}
            </form>
          </div>
      </div> 

    </>
  );
}

export default FormCrearTickets;
