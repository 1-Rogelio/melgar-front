import React, { useState, useEffect, useRef } from 'react';  
import { useParams, NavLink } from 'react-router-dom';
import { Editor } from "primereact/editor";
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import socket from '../socket';

import { format } from 'date-fns'; // Para formatear las fechas

import 'primeicons/primeicons.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
        
import imgUserChat from '../../assets/images/usuario.png';


function VerTickets() {

    const items = [
        { label: 'en espera' },
        { label: 'en proceso' },
        { label: 'resuelto' }
    ];

    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [respuestaRecibida, setRespuestaRecibida] = useState('');
    const [isSolicitante, setIsSolicitante] = useState(true);
    const [stepIndex, setStepIndex] = useState(0); // Índice del Step actual

    const modalRef = useRef(null); // Referencia para controlar el modal

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
        
        socket.on('respuestaRecibida', (respuestaRecibida) => {
            setMessages((prevMessages) => [...prevMessages, respuestaRecibida]);
        });

        return () => {
            socket.off('respuestaRecibida');
        };
    }, [ticket]);

    // Fetch ticket and existing messages
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/tickets/${ticketId}`);
                setTicket(response.data);
                setLoading(false);
                updateStepIndex(response.data.estado); // Establecer el estado inicial del Step

                // Load existing messages
                const res = await axios.get(`http://localhost:3000/api/v1/respuestas/ver-respuestas/${ticketId}`);
                setMessages(res.data);
            } catch (error) {
                console.error('Error al obtener los detalles del ticket', error);
                setLoading(false);
            }
        };

        if (ticketId) {
            fetchTicket();
        }
    }, [ticketId]);

    // Sending a new message
    const handleSendMessage = async () => {
        if (respuestaRecibida.trim()) {
            const messageObj = {
                id_tickets: ticketId,
                id_usuarios: isSolicitante ? ticket.solicitante : ticket.destinatario,
                mensaje: respuestaRecibida,
            };
    
            try {

                // Save message in backend
                await axios.post('http://localhost:3000/api/v1/respuestas', messageObj);

                // Emit message through Socket.IO for real-time update
                socket.emit('nuevaRespuesta', messageObj);
                
                // Clear input after sending
                setRespuestaRecibida('');

                // Cambiar estado a "En proceso" si hay respuestas
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
            const response = await axios.patch(`http://localhost:3000/api/v1/tickets/${ticketId}`, {
                estado: nuevoEstado,
                activo: nuevoEstado === 'resuelto' ? 0 : 1
            });
            setTicket(response.data);
            updateStepIndex(nuevoEstado); // Actualizar el Step según el nuevo estado

            //Simular clic en el boton de cierre modal
            document.querySelector('.btn-close').click();
        } catch (error) {
            console.error('Error al actualizar el estado del ticket', error);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!ticketId) {
        return <p>No se encontró el ticket...</p>;
    }

    // Función para agrupar mensajes por día
//     const groupMessagesByDate = (messages) => {
//     return messages.reduce((groups, message) => {
//         const date = format(new Date(message.fecha_respuesta), 'yyyy-MM-dd');
//         if (!groups[date]) {
//             groups[date] = [];
//         }
//         groups[date].push(message);
//         return groups;
//     }, {});
// };

// const groupedMessages = groupMessagesByDate(messages);
    
    return (
        <>
            <div className="main_detalles_ticket">
                <center>
                    <div className="container_main_ver_mas_tickets">
                        <div className="form_ver">
                            <NavLink to="/mis-tickets">
                                <p className='boton_Exit pi pi-arrow-circle-left c_red' style={{ marginLeft:'-8rem', marginTop:'0.5rem' }}></p>
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
                                        <input className={`form-control text_global ${ticket.activo ? 'c_green' : 'c_red'}`} value={ticket.activo ? (ticket.fecha_creacion || 'fecha no disponible') : (ticket.fecha_cierre || 'fecha no disponible') } readOnly type="text" />
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
                            </div>
                        </div>
                    </div>
                </center><br />

                
                {/* Editor para mandar mensaje */} 
                {ticket.estado !== 'resuelto' && (
                        <center>
                        <div className='box_respuesta'><br />
                            <div>
                                <p className='text_positionCenter text_global c_blue'>Responder al ticket</p>
                            </div>
                            <div>
                                {/* <label htmlFor="">Responder ticket</label> */}
                                <Editor className='editor_responder_ticket' id='mensaje' name='mensaje' value={respuestaRecibida} onTextChange={(e) => setRespuestaRecibida(e.htmlValue)} style={{ height: '120px' }}/>
                                <label className='text_global c_red' htmlFor="">Adjuntar archivo</label>
                                <input  className='form-control' type="file" />
                            </div>
                            
                            <div className='button_enviar_respuesta'>
                                <button className='button_reply_ticket' onClick={handleSendMessage} style={{width:'100%'}}>Enviar Respuesta</button>
                            </div>                                 
                        </div><br /><br />
                    </center>
                    )}

                <center>
                    <div className="container_respuestas">
                        <div>
                            <h1>Respuestas</h1><hr />
                        </div>

                            {/* Mensaje si no hay respuestas */}
                            {messages.length === 0 ? (
                            <p className='text_no_respuestas'>No hay respuestas todavía</p>
                            ) : (
                                messages.slice().reverse().map((msg, index) => (
                                    <div key={index} className={`container_chat_${msg.id_usuarios === ticket.solicitante ? "solicitante" : "destinatario"}`}>
                                        <div className={`message_content_${msg.id_usuarios === ticket.solicitante ? "solicitante" : "destinatario"}`}>
                                            <div className='container_datos'>
                                                <img className='img_chat' src={(msg.Usuario && msg.Usuario.img) ? msg.Usuario.img : imgUserChat} width={'55rem'} alt="Usuario" />
                                                <p>{(msg.Usuario && msg.Usuario.nombre) ? msg.Usuario.nombre : 'usuario desconocido'}</p>
                                                <p className='time'>{new Date(msg.fecha_respuesta).toLocaleTimeString()}</p>
                                            </div>
                                            <div className='caja_chat'>
                                                <Editor className='mensaje_chat custom-editor' id='mensaje' name='mensaje' value={msg.mensaje} readOnly style={{border: 'none'}}/>
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

export default VerTickets;
