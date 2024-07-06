import '../tusTickets/TusTickets.css'

function TusTickets() {

    return(
        <>

        <div className='tusTickets table-bordered mx-auto'>
            <h1 className='titulo'>Tus Tickets</h1>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Solicitante</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Límite de tiempo</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td className='text-center'>---</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td className='text-center'>---</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>Otto</td>
                    <td className='text-center'>---</td>
                </tr>
                </tbody>
            </table>
        </div>

        </>
    )
    
}

export default TusTickets;