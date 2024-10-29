// src/socket.js
import { io }  from 'socket.io-client';

//Crear y exportar la conexion del socket
const socket = io ('http://localhost:3000/tickets')

export default socket;