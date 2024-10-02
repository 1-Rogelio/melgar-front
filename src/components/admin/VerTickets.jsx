import React, { useState, useEffect } from 'react'; 
import { useParams, NavLink } from 'react-router-dom';
import { Editor } from "primereact/editor";
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import axios from 'axios';

import imgUserChat from '../../assets/images/usuario.png'

function VerTickets() {

    const items = [
        {
            label: 'En espera'
        },
        {
            label: 'En proceso'
        },
        {
            label: 'Resuelto'
        }
    ];

    const [text, setText] = useState('');
    const [showDialog, setShowDialog] = useState(false); // Estado para controlar la visibilidad del modal

    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
          const messageObj = {
            sender: isSolicitante ? "Solicitante" : "Destinatario",
            text: newMessage,
          };
          setMessages([...messages, messageObj]);
          setNewMessage("");
          setIsSolicitante(!isSolicitante); // Cambia el remitente
        }
      };

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/tickets/${ticketId}`);
                setTicket(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles del ticket', error);
                setLoading(false);
            }
        };

        if (ticketId) {
            fetchTicket();
        }
    }, [ticketId]);

    if (loading) {
        return <p>Cargando...</p>
    }

    if (!ticketId) {
        return <p>No se encontró el ticket...</p>
    }

    return (
        <>
            <div className="main_detalles_ticket">
                <center>
                    <div className="container_main_ver_mas_tickets">
                        <div className="form_ver">
                            <NavLink to="/mis-tickets">
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
                                {/* <div className='status_ticket'>
                                    <div>
                                        <label className='c_blue text_global'>Selecciona el status del ticket</label>
                                    </div>
                                    <div>
                                        <select name="" id="" className='text_paragraphs input_status_ticket text_positionCenter'>
                                            <option value="">---</option>
                                            <option value="" className='c_orange'>En espera</option>
                                            <option value="" className='c_blue'>En proceso</option>
                                            <option value="" className='c_green'>Resuelto</option>
                                        </select>
                                    </div>
                                </div> */}

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
                                            // onTextChange={(e) => setDescripcion(e.htmlValue)}
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

            {/* Ventana emergente (modal) */}
            <Dialog header="Responder al ticket" className='text_positionCenter' visible={showDialog} style={{ width: '50vw' }} modal onHide={() => setShowDialog(false)}>
                <div><br />
                    <Editor className='editor_responder_ticket' value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
                </div>
                <div className='button_send'>
                    <button className='button_reply_ticket'>Enviar</button>
                </div>
            </Dialog><br /><br />

                <center>
                    <div className="container_respuestas">
                            <div>
                                <h1>Respuestas</h1><hr />
                            </div>
                        <div className="container_chat_solicitante">
                            <div>   
                                <img src={imgUserChat} width={'55rem'} alt="" />    <p>Usuario</p>  
                            </div>
                            <div>
                                <p className='time'>12:11 pm</p>
                            </div>
                            <div className='caja_chat'>
                                <p></p>
                            </div>
                        </div>

                        <div className="container_chat_destinatario">
                            <div>   
                                <img src={imgUserChat} width={'55rem'} alt="" />    <p>Usuario</p>  
                            </div>
                            <div>
                                <p className='time'>12:15 pm</p>
                            </div>
                            <div className='caja_chat'>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        </>
    );
}

export default VerTickets;
