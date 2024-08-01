// -----------IMPORTAMOS COMPONENTES-------------
import Header from '../header/Header';
// import Nav from '../navbar/Nav';
// import User from '../userIcon/User'

// import { useState, useEffect } from "react";
// import axios from "axios";

//-----------Archivo JSX PARA API----------------

function TodosTickets() {

    // const [clientes, setClientes] = useState([]);

    // useEffect(() => {
    //     axios.get('http://10.10.1.11:3000/api/v1/clientes')
    //         .then((response) => {
    //           setClientes(response.data);
    //             // clientes = setClientes;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []); // El array vacío asegura que el efecto solo se ejecute una vez después del primer renderizado

    // GetApi();
    // console.log(getApi());
    return(
    <>
        <div>
            {/* ------------MANDAMOS A LLAMAR LOS COMPONENTES--------------         */}
            <Header/>
        
            <h1 className='m_top text_positionCenter text_caption'>Todos los tickets</h1>
        
                {/*-----------------------TABLA DE TODOS LOS TICKETS---------------------*/}
                <table className="titulos w-75 table table-bordered mx-auto mt-4">
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center' scope="col">#</th>
                            <th className='text-center' scope="col">Solicitante</th>
                            <th className='text-center' scope="col">Destinatario</th>
                            <th className='text-center' scope="col">Asunto</th>
                            <th className='text-center' scope="col">Descripción</th>
                            <th className='text-center' scope="col">Tipo</th>
                            <th className='text-center' scope="col">Fecha de creación</th>
                            <th className='text-center' scope="col">Fecha de actualización</th>
                            <th className='text-center' scope="col">Fecha de cierre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td className='text-center'>Mark</td>
                            <td className='text-center'>Otto</td>
                            <td className='text-center'>@mdo</td>
                            <td className='text-center'>Mark</td>
                            <td className='text-center'>Otto</td>
                            <td className='text-center'>@mdo</td>
                            <td className='text-center'>Mark</td>
                            <td className='text-center'>Otto</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td className='text-center'>Jacob</td>
                            <td className='text-center'>Thornton</td>
                            <td className='text-center'>@fat</td>
                            <td className='text-center'>Mark</td>
                            <td className='text-center'>@mdo</td>
                            <td className='text-center'>Otto</td>
                            <td className='text-center'>@mdo</td>
                            <td className='text-center'>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td className='text-center'>Larry the Bird</td>
                            <td className='text-center'>Jacob</td>
                            <td className='text-center'>@twitter</td>
                            <td className='text-center'>Mark</td>
                            <td className='text-center'>Otto</td>
                            <td className='text-center'>@mdo</td>
                            <td className='text-center'>Mark</td>
                            <td className='text-center'>Otto</td>
                        </tr>
                    </tbody>
                </table><br /><br />

        {/*-----------------------TABLA DE TODOS LOS CLIENTES---------------------*/}

            {/* <table className="titulos w-75 table table-bordered mx-auto mt-4">
                <thead className='table-dark'>
                    <tr>
                        <th className='text-center' scope="col">#</th>
                        <th className='text-center' scope="col">Nombre</th>
                        <th className='text-center' scope="col">Apellido Paterno</th>
                        <th className='text-center' scope="col">Apellido Materno</th>
                        <th className='text-center' scope="col">correo</th>
                        <th className='text-center' scope="col">Telefono</th>
                        <th className='text-center' scope="col">Direccion</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(( cliente, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className='text-center'>{cliente.nombreCliente}</td>
                        <td className='text-center'>{cliente.apellidoPaternoCliente}</td>
                        <td className='text-center'>{cliente.apellidoMaterno}</td>
                        <td className='text-center'>{cliente.correo}</td>
                        <td className='text-center'>{cliente.telefono}</td>
                        <td className='text-center'>{cliente.direccion}</td>
                    </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    </>
    );    
}

export default TodosTickets;