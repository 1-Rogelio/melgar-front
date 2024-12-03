import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Editor } from "primereact/editor";
import Swal from 'sweetalert2';
import { Toast } from 'primereact/toast';
import axios from "axios";

import HeaderContador from './header/HeaderContador';

function CrearTickets() {

  const [selectedDestinatario, setSelectedDestinatario] = useState(null);
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [destinatarios, setDestinatarios] = useState([]);
  const [solicitante, setSolicitante] = useState('');
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const toast = useRef(null);

  const [solicitanteId, setSolicitanteId] = useState(null);

  // Obtener destinatarios
  const fetchDestinatarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/usuarios/buscador');
      setDestinatarios(response.data);
    } catch (error) {
      console.error('Error fetching destinatarios');
    }
  };

  // Obtener solicitante de sessionStorage al cargar el componente
  useEffect(() => {
    const nombreUsuario = sessionStorage.getItem('nombre'); 
    const apellidoPaternoUser = sessionStorage.getItem('apellidoPaterno');
    const idUsuario = sessionStorage.getItem('userId');

    if (nombreUsuario) {
      setSolicitante(nombreUsuario);
    }

    if (apellidoPaternoUser) {
      setApellidoPaterno(apellidoPaternoUser)
    }

    if (idUsuario) {
      setSolicitanteId(idUsuario); // Guarda el id del solicitante
    }

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

    // Usamos SweetAlert2 para confirmar antes de enviar
    const result = await Swal.fire({
      title: '¿Los datos son correctos?',
      text: 'Si es así, da clic en enviar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // Enviar ticket si el usuario confirma
      try {
        await axios.post('http://localhost:3000/api/v1/tickets', {
          solicitante: solicitanteId ,
          destinatario: selectedDestinatario ? selectedDestinatario.id_usuarios : null,
          asunto,
          descripcion,
          tipo
        });
        
        // Muestra la alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El ticket ha sido creado correctamente.'
        });

        // Limpiar datos al enviar
        setSelectedDestinatario('')
        setAsunto('');
        setDescripcion('');
        setTipo('');
      } catch (error) {
        console.error('Error al guardar ticket');
        // Muestra la alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar el ticket. Intenta nuevamente.'
        });
      }
    }
  };

  return (
    <>
    
    <div>
      <HeaderContador/>
    </div>

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
                        <label className="text_global" htmlFor="">Solicitante</label>
                        <input type="text" value={`${solicitante} ${apellidoPaterno}`} onChange={(e) => setSolicitante(e.target.value)} className="form-control text-center input_solicitante" style={{height: '2rem'}} readOnly/>
                      </div>
                      <div className="destinatario cajas_form">
                          <Dropdown value={selectedDestinatario} onChange={(e) => setSelectedDestinatario(e.value)} options={destinatarios} optionLabel={(option) => `${option.nombre} ${option.apellidoPaterno} ${option.apellidoMaterno}`} optionValue="id_usuarios" placeholder="Selecciona un destinatario" 
                          filter itemTemplate={destinatarioOptionTemplate} className="w-full md:w-15rem"/> 
                      </div>
                    </div>

                    <div className="asunto_descripcion">
                      <div className="asunto cajas_form">
                        <FloatLabel>
                          <InputTextarea className="text-center" value={asunto} onChange={(e) => setAsunto(e.target.value)} rows={4} cols={80} />
                          <label className="pi pi-file"> Asunto</label>
                        </FloatLabel>
                      </div>
                    </div>
                    <div className="editor cajas_form">
                      <Editor
                        value={descripcion}
                        onTextChange={(e) => setDescripcion(e.htmlValue)}
                        style={{ height: '200px' }}
                      />
                    </div>

                    <center>
                      <div className="tipo cajas_form">
                        <label className="tipo_text" htmlFor="">Tipo</label>
                        {/* <input className="" value={tipo} onChange={(e) => setTipo(e.target.value)} type="text" /> */}
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-select">
                          <option value="" className='text-center'>--</option>
                          <option value="Contable">Contable</option>
                          <option value="Tecnico">Tecnico</option>
                          <option value="Otro">Otro</option>
                        </select>
                        <button 
                          type="button" 
                          className="boton_enviar col-md-5 offset-md-4 btn bg_green" 
                          onClick={handleSubmit}
                          >
                          <label className='pi pi-check'></label>Enviar
                        </button>
                      </div>
                    </center>    
                </div> 
            </form>
          </div>
      </div>
    </>
  );
}

export default CrearTickets;
