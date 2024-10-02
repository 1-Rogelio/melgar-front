import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import { Message } from 'primereact/message';
import { NavLink } from 'react-router-dom';

function TusTicketsAuxiliar() {

    const [isHovered, setIsHovered] = useState(false);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            fetchNotificaciones(userId);
        }
    }, []);

    const fetchNotificaciones = async (userId) => {
        try {
            console.log('UserId:', userId);
            const response = await axios.get(`http://localhost:3000/api/v1/tickets/user-tickets-actives/${userId}`);
            setTickets(response.data);
        } catch (error) {
            console.error('Error al obtener los tickets', error);
        }
    };

    const renderMessage = (tipo) => {
        switch(tipo) {
            case 'Técnico':
                return <p className='pi pi-server c_green'> Mensaje técnico</p>;
            case 'Contable':
                return <p className='pi pi-briefcase c_blue'> Mensaje contable</p>;
            case 'Otro':
                return <p className='pi pi-exclamation-triangle c_orange'> Mensaje otro</p>;
            default:
                return <p className='pi pi-info-circle c_grey'> Defecto</p>;
        }
    };

  return (
    <>
    
    <div className='table-bordered container_tables mx-auto box_center'>
            <div className='tickets_title'>
                <h1 className='c_black text_positionCenter text_caption'>Tus Tickets</h1>

                <div className='eye_tickets'>
                    <NavLink to="/mis-tickets-auxiliar">
                        <i
                            className={`icon_Eye pi ${isHovered ? 'pi-eye' : 'pi-eye-slash'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        ></i>
                    </NavLink>
                </div>
            </div>

            <table className="table table-bordered mx-auto text-center">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'><i className='pi pi-user'></i></th>
                        <th>Tipo</th>
                        <th scope="col" className='text-center'><i className='pi pi-chart-bar'></i></th>
                    </tr>
                </thead>

                <tbody className="table-group-divider">
                    {tickets.length > 0 ? (
                        tickets.map((ticket, index) => (
                            <tr key={ticket.id_tickets}>
                                <th scope="row">{index + 1}</th>
                                <td>{ticket.Solicitante.nombre}</td>
                                <td>{ticket.tipo}</td>
                                <td className='message'>{renderMessage(ticket.tipo)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No hay tickets disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    
    </>
  );
}

export default TusTicketsAuxiliar;
