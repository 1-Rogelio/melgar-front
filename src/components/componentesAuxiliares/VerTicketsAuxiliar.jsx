import React, { useState, useEffect, useRef } from 'react'; 
import { useParams, NavLink } from 'react-router-dom';
import { Editor } from "primereact/editor";
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import Swal from 'sweetalert2';
import axios from 'axios';
import socket from '../socket';

import { format } from 'date-fns'; // Para formatear las fechas

import 'primeicons/primeicons.css';

// Importaciones de iconos
import URL_ICONO_DEFAULT from '../../assets/images/Iconos/aceptacion.png';
import URL_ICON_TXT from '../../assets/images/Iconos/agenda_txt.png';
import URL_ICON_PDF from '../../assets/images/Iconos/pdf.png';
import URL_ICON_DOC from '../../assets/images/Iconos/word.png';
import URL_ICON_EXCEL from '../../assets/images/Iconos/excel.png';
import URL_ICON_POWERPOINT from '../../assets/images/Iconos/png_powerpoint-copia.png'
import URL_ICON_XML from '../../assets/images/Iconos/xml.png';
import URL_ICON_IMAGE from '../../assets/images/Iconos/img.png';

import imgUserChat from '../../assets/images/usuario.png';

function VerTicketsAuxiliar() {

    const { id_tickets } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [respuestaRecibida, setRespuestaRecibida] = useState('');
    const [adjuntos, setAdjuntos] = useState([]); // Estado para los archivos adjuntos
    const [isSolicitante, setIsSolicitante] = useState(true);
    const fileInputRef = useRef(null); // Referencia para el input de archivos

    const [stepIndex, setStepIndex] = useState(0); // Índice del Step actual

    const modalRef = useRef(null); // Referencia para controlar el modal

    // Función para obtener el icono según la extensión del archivo
    const getFileIcon = (fileUrl) => {
        const extension = fileUrl.split('.').pop().toLowerCase();
        
        if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
            return <img src={URL_ICON_IMAGE} alt="Imagen" className="file-image" />;
        } else if (extension === "pdf") {
            return <img src={URL_ICON_PDF} alt="PDF Icon" className="file-icon" />;
        } else if (extension === "xml") {
            return <img src={URL_ICON_XML} alt="XML Icon" className="file-icon" />;
        } else if (["doc", "docx"].includes(extension)) {
            return <img src={URL_ICON_DOC} alt="Word Icon" className="file-icon" />;
        } else if (["xls", "xlsx"].includes(extension)) {
            return <img src={URL_ICON_EXCEL} alt="Excel Icon" className="file-icon" />;
        } else if (["pptx", "pptm", "potx", "potm"].includes(extension)) {
            return <img src={URL_ICON_POWERPOINT} alt="PwPoint Icon" className="file-icon" />;
        } else if (extension === "txt") {
            return <img src={URL_ICON_TXT} alt="Txt Icon" className="file-icon" />;
        } else {
            return <img src={URL_ICONO_DEFAULT} alt="File Icon" className="file-icon" />;
        }
    }

    const items = [
        { label: 'En espera' },
        { label: 'En proceso' },
        { label: 'Resuelto' }
    ];

    // Socket connection and listening to incoming messages
    useEffect(() => {
        const loggedInUserId = parseInt(sessionStorage.getItem('userId'));

        if (ticket) {
            setIsSolicitante(ticket.solicitante === loggedInUserId);
            updateStepIndex(ticket.estado);

        }
    }, [ticket]);

    const updateStepIndex = (estado) => {
        if (estado === 'en espera') {
            setStepIndex(0);
        } else if (estado === 'en proceso') {
            setStepIndex(1);
        } else if (estado === 'resuelto') {
            setStepIndex(2);
        }
    };

    // Socket para escuchar respuestas en tiempo real
    useEffect(() => {
        socket.emit('unirTicketSala', id_tickets); // Unirse a la sala del ticket

        socket.on('respuestaRecibida', (respuestaRecibida) => {
            setMessages((prevMessages) => [...prevMessages, respuestaRecibida]);
        });

        socket.on('ticketCerrado', (data) => {
            if (data.id_tickets === parseInt(id_tickets)) {
                setTicket((prevTicket) => ({
                    ...prevTicket,
                    estado: data.estado, //Actualiza el estado del ticket
                    fecha_cierre: data.fecha_cierre, //Actualiza la fecha de cierre
                }));
                updateStepIndex(data.estado); //Actualiza la interfaz según el estado
            }
        });

        return () => {
            socket.off('respuestaRecibida');
            socket.emit('salirTicket', `ticket_${id_tickets}`); // Salir de la sala cuando el componente se desmonta
            socket.off('ticketCerrado');
        };
    }, [ticket, id_tickets]);

    // Fetch ticket and existing messages
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/tickets/${id_tickets}`);
                setTicket(response.data);
                setLoading(false);
                updateStepIndex(response.data.estado); // Establecer el estado inicial del Step

                // Load existing messages
                const res = await axios.get(`http://localhost:3000/api/v1/respuestas/ver-respuestas/${id_tickets}`);
                setMessages(res.data);
            } catch (error) {
                console.error('Error al obtener los detalles del ticket', error);
                setLoading(false);
            }
        };

        if (id_tickets) {
            fetchTicket();
        }
    }, [id_tickets]);

    const handleFileChange = (e) => {
        setAdjuntos(Array.from(e.target.files));
    };

    // Sending a new message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        // Verificar si el campo "mensaje" está vacío
        if (!respuestaRecibida.trim()) {
            // Mostrar alerta de SweetAlert2 si el mensaje está vacío
            Swal.fire({
                icon: 'error',
                title: 'Campo mensaje requerido',
                text: 'Por favor, ingrese un mensaje antes de enviar.',
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Verifica si el número de archivos adjuntos excede el límite
        if (adjuntos.length > 10) {
            // Muestra la alerta usando SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Límite de archivos alcanzado',
                text: 'Se excedió el límite de archivos adjuntos (máximo 10 archivos).',
            });
            return;  // Detiene la ejecución si el número de archivos es mayor a 10
        }

        if (respuestaRecibida.trim()) {

            console.log('Enviando mensaje:', respuestaRecibida);
            console.log('isSolicitante:', isSolicitante);
            console.log('Solicitante ID:', ticket.solicitante);
            console.log('Destinatario ID:', ticket.destinatario);

            const formData = new FormData();
            formData.append('id_tickets', id_tickets);
            formData.append('id_usuarios', isSolicitante ? ticket.solicitante : ticket.destinatario);
            formData.append('mensaje', respuestaRecibida);

            adjuntos.forEach((file) => {
                formData.append('adjunto', file);
            });
    
            try {
                const response = await axios.post('http://localhost:3000/api/v1/respuestas', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                socket.emit('nuevaRespuesta', response.data);

                setRespuestaRecibida('');
                setAdjuntos([]);

                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Limpiar el campo de archivo
                }

                if (ticket.estado === 'en espera') {
                    await updateTicketState('en proceso');
                }
            } catch (error) {
                console.error('Error al enviar el mensaje', error);
            }
        }
    };

    const updateTicketState = async (nuevoEstado) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/tickets/${id_tickets}`, {
                estado: nuevoEstado,
                activo: nuevoEstado === 'resuelto' ? 0 : 1,
                fecha_cierre:  new Date()
            });

            setTicket(response.data);
            updateStepIndex(nuevoEstado);

            // Emitir evento a ambos usuarios
            socket.emit('ticketCerrado', response.data);

            //Simular clic en el boton de cierre modal
            document.querySelector('.btn-close').click();
        } catch (error) {
            console.error('Error al actualizar el estado del ticket', error);
        }
    };

    // Función para formatear fechas
    const formatDate = (timestamp) => {
        if (!timestamp) return 'fecha no disponible';
        const date = new Date(timestamp);
        // Ajustar a tu zona horaria si es necesario
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            // hour: 'numeric',
            // minute: '2-digit',
            // hour12: true 
        };
        return date.toLocaleString('es-ES', options);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!id_tickets) {
        return <p>No se encontró el ticket...</p>;
    }

  return (
    <>
    
    <div className="main_detalles_ticket">
                <center>
                    <div className="container_main_ver_mas_tickets">
                        <div className="form_ver">
                            <NavLink to="/mis-tickets-auxiliar">
                                <p className='boton_Exit pi pi-arrow-circle-left c_red' style={{marginLeft:'-8rem', marginTop:'0.5rem'}}></p>
                            </NavLink>

                            <div className='caja_boton_cerrar_ticket'>
                                <div>
                                    <h1 className='title_detalle_ticket text_positionCenter text_caption'>Detalles del ticket</h1>
                                </div>
                                <div> 
                                    {/* Aquí los detalles del ticket y botones */}
                                    {isSolicitante && ticket.estado !== 'resuelto' && (
                                    <button 
                                    type="button" 
                                    className="boton_resuelto" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" 
                                    >
                                        Cerrar ticket
                                    </button>
                                    )}
                                </div>

                                <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                    ref={modalRef}
                                    >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                            ¿Seguro que desea cerrar el ticket?
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
                                            {/* <Toast ref={toast}></Toast> */}
                                            <button type="button" onClick={() => updateTicketState('resuelto')} className="btn btn-success"><label className='pi pi-check'></label> Sí, enviar</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                            <hr className='hrr'/>

                            <div className="container_detalles_ticket">
                                <div className="card steps">
                                    <Steps model={items} activeIndex={stepIndex}/>
                                </div>

                                <div className='columUno'>
                                    <div>
                                        <label className='text_global'>Solicitante</label>
                                        <input className='form-control c_orange text_sh_orange text_global' value={ticket.Solicitante?.nombre || 'no disponible'} readOnly type="text" />
                                    </div>

                                    <div>
                                        <label className='text_global fechass'>{ticket.activo ? 'Fecha de creación' : 'Fecha de cierre'}</label>
                                        <input className={`form-control text_global ${ticket.activo ? 'c_green' : 'c_red'}`} 
                                        value={ticket.activo 
                                            ? formatDate(ticket.fecha_creacion || 'fecha no disponible') 
                                            : formatDate(ticket.fecha_cierre || 'fecha no disponible') } 
                                        readOnly 
                                        type="text" />
                                    </div>
                                </div>

                                <div className='columDos'>
                                    <div>
                                        <label className='text_global'>Asunto:</label>
                                        <textarea id="asunto" className='form-control text_paragraphs text_global' name="asunto" value={ticket.asunto || 'no disponible'} readOnly></textarea>
                                    </div>

                                    <div className='width_editor'>
                                        <label className='text_global'>Descripción:</label>
                                        <Editor
                                            id='descripcion'
                                            name='descripcion'
                                            value={ticket.descripcion || 'no disponible'}
                                            style={{ height: '200px' }}
                                            className="custom-editor" // Clase eliminar barra de herramientas
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* Editor para mandar mensaje */} 
                                {ticket.estado !== 'resuelto' && (
                                        <center>
                                        <div className='box_respuesta'><br />
                                            <div>
                                                <p className='text_positionCenter text_global c_blue'>Responder al ticket</p>
                                            </div>
                                            <div>
                                                {/* <label htmlFor="">Responder ticket</label> */}
                                                <Editor required className='editor_responder_ticket' id='mensaje' name='mensaje' value={respuestaRecibida} onTextChange={(e) => setRespuestaRecibida(e.htmlValue)} style={{ height: '120px' }}/>
                                                <label className='text_global c_red' htmlFor="">Adjuntar archivo</label>
                                                <input  className='form-control' type="file" multiple onChange={handleFileChange} ref={fileInputRef}/>
                                            </div>
                                            
                                            <div className='button_enviar_respuesta'>
                                                <button className='button_reply_ticket' onClick={handleSendMessage} style={{width:'100%'}}>Enviar Respuesta</button>
                                            </div>                                 
                                        </div><br /><br />
                                    </center>
                                    )}

                            </div>
                        </div>
                    </div>
                </center>

            <center>
            <div className="container_respuestas">
                        <div>
                            <h1>Respuestas</h1><hr />
                        </div>

                            {/* Mensaje si no hay respuestas */}
                            {messages.length === 0 ? (
                            <p className='text_no_respuestas'>No hay respuestas todavía</p>
                            ) : (
                                messages.slice().reverse().map((msg) => (
                                    <div key={msg.id_respuestas} className={`container_chat_${msg.id_usuarios === ticket.solicitante ? "solicitante" : "destinatario"}`}>
                                        <div className={`message_content_${msg.id_usuarios === ticket.solicitante ? "solicitante" : "destinatario"}`}>
                                            <div className='container_datos'>
                                                <img className='img_chat' src={(msg.Usuario && msg.Usuario.img) ? msg.Usuario.img : imgUserChat} width={'55rem'} alt="Usuario" />
                                                <p>{(msg.Usuario && msg.Usuario.nombre) ? msg.Usuario.nombre : 'usuario desconocido'}</p>
                                                <div className='date_time'>
                                                    <p className='date'>{new Date(msg.fecha_respuesta).toLocaleDateString()}</p>
                                                    <p className='time'>{new Date(msg.fecha_respuesta).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                            <div className='caja_chat'>
                                                <Editor className='mensaje_chat custom-editor' id='mensaje' name='mensaje' value={msg.mensaje} readOnly style={{border: 'none'}}/>
                                                {msg.adjunto && Array.isArray(msg.adjunto) ? (
                                                    msg.adjunto.map((fileUrl) => (
                                                        <div key={fileUrl} className="file-attachment">
                                                            {getFileIcon(fileUrl)}
                                                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="file-link">{fileUrl.substring(55)}</a>
                                                        </div>
                                                    ))
                                                ) : (
                                                    msg.adjunto && (
                                                        <div className="file-attachment">
                                                            {getFileIcon(msg.adjunto)}
                                                            <a href={msg.adjunto} target="_blank" rel="noopener noreferrer" className="file-link">{msg.adjunto}</a>
                                                        </div>
                                                    )
                                                )} 
                                                {/* {msg.adjunto && msg.adjunto.map((fileUrl, index) => (
                                                    <div key={index} className="file-attachment">
                                                        {getFileIcon(fileUrl)}
                                                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="file-link">{fileUrl}</a>
                                                    </div>
                                                ))} */}

                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>
                </center>
            </div>
    
    </>
  );
}

export default VerTicketsAuxiliar;
