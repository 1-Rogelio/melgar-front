import React, { useState, useEffect } from 'react'; 
import { useParams, NavLink } from 'react-router-dom';
import { Editor } from "primereact/editor";
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import axios from 'axios';
import socket from '../socket';

import imgUserChat from '../../assets/images/usuario.png';

function VerTicketsContador() {

    const items = [
        { label: 'En espera' },
        { label: 'En proceso' },
        { label: 'Resuelto' }
    ];

    const [text, setText] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [respuestaRecibida, setRespuestaRecibida] = useState('');
    const [isSolicitante, setIsSolicitante] = useState(true);

    // Socket connection and listening to incoming messages
    useEffect(() => {
        const loggedInUserId = parseInt(sessionStorage.getItem('userId'));

        if (ticket) {
            setIsSolicitante(ticket.solicitante === loggedInUserId);
        }
    }, [ticket]);

    // Socket connection and listening to incoming messages
    useEffect(() => {
        
        socket.on('respuestaRecibida', (respuestaRecibida) => {
            setMessages((prevMessages) => [...prevMessages, respuestaRecibida]);
        });

        return () => {
            socket.off('respuestaRecibida');
        };
    }, []);

    // Fetch ticket and existing messages
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/tickets/${ticketId}`);
                setTicket(response.data);
                setLoading(false);

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
            } catch (error) {
                console.error('Error al enviar el mensaje', error);
            }
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!ticketId) {
        return <p>No se encontró el ticket...</p>;
    }

  return (
    <>
            <div className="main_detalles_ticket">
                <center>
                    <div className="container_main_ver_mas_tickets">
                        <div className="form_ver">
                            <NavLink to="/mis-tickets-contador">
                                <p className='boton_Exit pi pi-arrow-circle-left c_red' style={{marginLeft:'-8rem', marginTop:'0.5rem'}}></p>
                            </NavLink>

                            <div>
                                <h1 className='text_positionCenter text_caption'>Detalles del ticket</h1>
                            </div>
                            <hr className='hrr'/>

                            <div className="container_detalles_ticket">
                                <div className="card steps">
                                    <Steps model={items} />
                                </div>

                                <div className='columUno'>
                                    <div>
                                        <label className='text_global'>Solicitante</label>
                                        <input className='form-control c_orange text_sh_orange text_global' value={ticket.Solicitante.nombre || 'no disponible'} readOnly type="text" />
                                    </div>

                                    <div>
                                        <label className='text_global fechass'>{ticket.activo ? 'Fecha de creación' : 'Fecha de cierre'}</label>
                                        <input className={`form-control text_global ${ticket.activo ? 'c_green' : 'c_red'}`} value={ticket.activo ? (ticket.fecha_creacion || 'fecha no disponible') : (ticket.fecha_cierre || 'fecha no disponible') } readOnly type="text" />
                                    </div>
                                </div>

                                <div className='columDos'>
                                    <div>
                                        <label className='text_global'>Asunto</label>
                                        <textarea id="asunto" className='form-control text_paragraphs text_global' name="asunto" value={ticket.asunto || 'no disponible'} readOnly></textarea>
                                    </div>

                                    <div className='width_editor'>
                                        <label className='text_global'>Descripción</label>
                                        <Editor
                                            id='descripcion'
                                            name='descripcion'
                                            value={ticket.descripcion || 'no disponible'}
                                            style={{ height: '200px' }}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className='columTres'>
                                    <div>
                                        <button className='button_reply_ticket' onClick={() => setShowDialog(true)}>Responder</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </center>

                {/* Modal for sending a message */}
                <Dialog header="Responder al ticket" className='text_positionCenter' visible={showDialog} style={{ width: '50vw' }} modal onHide={() => setShowDialog(false)}>
                    <div><br />
                        <Editor className='editor_responder_ticket' id='mensaje' name='mensaje' value={respuestaRecibida} onTextChange={(e) => setRespuestaRecibida(e.htmlValue)} style={{ height: '320px' }} />
                    </div>
                    <div className='button_send'>
                        <button className='button_reply_ticket' onClick={handleSendMessage}>Enviar</button>
                    </div>
                </Dialog><br /><br />

                <center>
                    <div className="container_respuestas">
                        <div>
                            <h1>Respuestas</h1><hr />
                        </div>

                        {/* Messages Display */}
                        {messages.map((msg, index) => (
                            <div key={index} className={`container_chat_${msg.id_usuarios === ticket.solicitante ? "solicitante" : "destinatario"}`}>
                                <div className="message_content">
                                    <div className='container_datos'>
                                        <img className='img_chat' src={(msg.Usuario && msg.Usuario.img) ? msg.Usuario.img : imgUserChat} width={'55rem'} alt="Usuario" />
                                        <p>{(msg.Usuario && msg.Usuario.nombre) ? msg.Usuario.nombre : 'usuario desconocido'}</p>
                                        <p className='time'>{new Date(msg.fecha_respuesta).toLocaleTimeString()}</p>
                                    </div>
                                    <div className='caja_chat'>
                                        <Editor className='mensaje_chat' id='mensaje' name='mensaje' value={msg.mensaje} style={{ height: '90px' }} readOnly />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </center>
            </div>
    </>
  );
}

export default VerTicketsContador;
