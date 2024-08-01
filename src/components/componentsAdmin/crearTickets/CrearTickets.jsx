import React, { useState, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Editor } from "primereact/editor";
import { Toast } from 'primereact/toast';



// -------------Styles-----------------
import '../crearTickets/CrearTickets.css';

// --------importamos Componentes-------
import Nav from '../navbar/Nav';
import Header from '../header/Header';

function CrearTickets() {

//---------------Editor----------------
const [text, setText] = useState('');

//--------------Text area--------------
  const [value, setValue] = useState('');

// ------------Inputs Selects---------------
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];

  const selectedCountryTemplate = (option, props) => {
      if (option) {
          return (
              <div className="flex align-items-center">
                  <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                  <div>{option.name}</div>
              </div>
          );
      }

      return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
      return (
          <div className="flex align-items-center">
              <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
              <div>{option.name}</div>
          </div>
      );
  };

  //Toast
  const toast = useRef(null);
 
     const save = () => {
         toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Datos Guardados' });
     };

  return (
    <>
      <Header />
        
      <div className='container_all clearfix '>
        {/* -----------Mandamos a llamar los componentes a ocupar-------- */}
        

          {/* ----------------FORMULARIO---------------- */}
          <div className="container_Tickets p_rel p_a bg_nav">
            <form>
                <div>
                  <h1 className="titulo_Ticket text_positionCenter c_white">Generar tickets</h1><hr />
                </div>
              
              <div className="container_boxs">
                
                <div className="solicitante">
                  <i className="pi pi-user" style={{fontSize: '17px'}}></i> <label> Solicitante</label>
                  <input required className="input_tickets" />
                </div>

                <div className="destinatario card flex justify-content-center">
                  <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Destinatario" 
                  filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-10rem" />
                </div>  <label className="icon_arrow pi pi-arrow-right"></label>

                {/* <div className="fechas">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <label>Fecha de creacion: </label>
                  <input required className="input_Fechas" type="date" />
                </div>

                <div className="fechas">
                  <br />
                  <br />
                  <br />
                  <label>Fecha de actualización</label>
                  <br />
                  <input required className="input_Fechas" type="date" />
                </div>
                <div className="fechas">
                  <label>Fecha de cierre: </label>
                  <br />
                  <input required className="input_Fechas" type="date" />
                </div> */}

                <div className="asunto card flex justify-content-center">
                  <FloatLabel>
                    <InputTextarea id="asunto" value={value} onChange={(e) => setValue(e.target.value)} rows={4} cols={40} />
                    <label htmlFor="asunto" className="pi pi-file"> Asunto</label>
                  </FloatLabel>
                </div>

                <div className="descripcion card flex justify-content-center">
                  <FloatLabel>
                    <InputTextarea id="descripcion" value={value} onChange={(e) => setValue(e.target.value)} rows={4} cols={40} />
                    <label htmlFor="descripcion" className="pi pi-file-edit"> Descripcion</label>
                  </FloatLabel>
                </div>

                <div className="editor card">
                  <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '200px' }}/>
                </div>

                <div className="tipo card flex justify-content-center">
                  <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Tipo" 
                  filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-10rem" />
                </div> 
              </div>

              {/* ----------------------------------Boton de enviar----------------------------- */}
              <div className="col-md-4 mt-4 p_a r_big w_short">
                <button type="button" className="boton_enviar col-md-5 offset-md-4 btn bg_green" data-bs-toggle="modal"
                  data-bs-target="#exampleModal"><label className='pi pi-check'></label>Enviar</button>
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
                      <button type="button" className="btn btn-success" icon="pi pi-check" onClick={save}><label className='pi pi-check'></label> Sí, enviar</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
      </div>
    </>
  );
}

export default CrearTickets;
