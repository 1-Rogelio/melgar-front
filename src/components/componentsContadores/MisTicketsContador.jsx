import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import HeaderContadores from '../componentsContadores/header/HeaderContador';

function MisTicketsContador() {

    const [tickets, setTickets] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0); // Estado para el total de tickets
    const [filter, setFilter] = useState('Todos'); // Estado para el filtro de tickets
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
        fetchTickets(userId, filter);
        }
    }, [filter]); // Vuelve a hacer la petición cuando el filtro cambie

    const fetchTickets = async (userId, filter) => {
        let url = `http://localhost:3000/api/v1/tickets/user-tickets-all/${userId}`;
        
        if (filter === 'Activos') {
        url = `http://localhost:3000/api/v1/tickets/user-tickets-actives/${userId}`;
        } else if (filter === 'Cerrados') {
        url = `http://localhost:3000/api/v1/tickets/user-tickets-inactives/${userId}`;
        }

        try {
        const response = await axios.get(url);
        setTickets(response.data);
        setTotalTickets(response.data.length); // Actualizar el total de tickets
        } catch (error) {
        console.error('Error al obtener los tickets', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value); // Actualizar el filtro seleccionado
    };

    const handleVerDetalles = (ticketId) => {
        navigate(`/ver-mas-tickets-contador/${ticketId}`);
    };

    const getHeaderClass = (tipo) => {
        switch (tipo) {
        case 'Contable':
            return 'header-contable';
        case 'Técnico':
            return 'header-tecnico';
        default:
            return 'header-otro';
        }
    };

    // Función para obtener la clase CSS del estado (activo/inactivo)
    const getStatusClass = (activo) => {
        return activo === 1 ? 'status-circle active' : 'status-circle inactive';
    };

  return (
    <>

    <div>
        {/* ------------MANDAMOS A LLAMAR LOS COMPONENTES--------------         */}
        <HeaderContadores/>

        <div className='select_tickets'>
            <div>
                <label className='text_global c_black'>Selecciona tus tickets</label>
                <select className="form-select" value={filter} onChange={handleFilterChange}>
                    <option value="Todos">Todos</option>
                    <option value="Activos">Activos</option>
                    <option value="Cerrados">Cerrados</option>
                </select>
            </div><br />
            <div>
                <p className='text_global_medium c_black'>
                    Total de tickets: <a className='c_red'>{totalTickets}</a>
                </p>
            </div>
      </div>

        <div className='box_center'>
            <h1 className='p_a m_top c_black text_caption'>Mis tickets</h1>
            <NavLink to="/home-contador">
                <p className='boton_Exit pi pi-arrow-circle-left c_red'></p>
                {/* <Button severity="danger" rounded label="Regresar" icon="pi pi-arrow-circle-left" /> */}
            </NavLink>
        </div><br />
                        
        <div className="box_center m_top_medium">
            <div className="tickets-container">
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                    <div key={ticket.id_tickets} className="ticket-card">
                        <div className={`ticket-header ${getHeaderClass(ticket.tipo)}`}>
                        <h2 className="ticket-title text_mis_tickets">Tipo: {ticket.tipo}</h2><hr />
                        </div>
                        <div className="ticket-body">
                        <div>
                            <strong>Solicitante:</strong>
                            <p className='c_orange text_sh_orange text_global'>{ticket.Solicitante.nombre}</p>
                        </div>
                        <div>
                            <strong>Asunto:</strong>
                            <p className='text_global'>{ticket.asunto.length > 20 ? ticket.asunto.slice(0, 22) + '...' : ticket.asunto}</p>
                        </div>
                        <div>
                            <strong>Descripción:</strong>
                            <p className='text_global'>{ticket.descripcion.length > 25 ? ticket.descripcion.slice(0, 25) + '...' : ticket.descripcion}</p>
                        </div>
                        <div>
                            <strong>Activo:</strong>
                            <span className={getStatusClass(ticket.activo)}></span>
                            {/* Círculo verde o rojo según el estado */}
                        </div>
                        </div>
                        <div className="ticket-footer">
                        <button className="ver-mas-btn" onClick={() => handleVerDetalles(ticket.id_tickets)}>
                            Ver más
                        </button> 
                        </div>
                    </div>
                    ))
                ) : (
                    <div>
                    <p className="text_positionCenter">No hay tickets disponibles</p>
                    </div>
                )}
            </div>
      </div>
    </div>

    </>
  );
}

export default MisTicketsContador;
