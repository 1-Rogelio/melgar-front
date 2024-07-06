import Header from '../header/Header';
import Nav from '../navbar/Nav';

function TodosTickets() {
    return(
        <>
        <Header/>
        <Nav/>
        <h1>Todos los tickets</h1>

        {/*-----------------------TABLA---------------------*/}
        <table className="w-75 table table-bordered mx-auto mt-4">
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
        </table>
        </>
    )    
}

export default TodosTickets;