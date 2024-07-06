import '../fielesHome/FielesHome.css'

function BodyHome(){
    
    return(
       <>

        <div className='tabla table-bordered mx-auto'>
            <h1 className='titulo'>Fieles</h1>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tiempo</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>Otto</td>
                </tr>
                </tbody>
            </table>
        </div>

       </> 
    )

}

export default BodyHome;