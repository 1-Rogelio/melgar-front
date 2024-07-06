import'../crearTickets/CrearTickets.css'
import Nav from '../navbar/Nav'
import Header from '../header/Header'

function CrearTickets() {

  return (
    <>
    <Header/>
    <Nav/>
    {/* ---------TITULO--------- */}
    <div className="fondo">
      <div className='tituloTicket'>
        <h1>Generar tickets</h1>
      </div><br />

    {/* ------------Iconos Ticket------------ */}
      {/* <i className="iconMano fa-solid fa-hand"></i>
      <i className="iconAvion fa-solid fa-plane"></i>
      <i className="iconFolder fa-solid fa-folder-open"></i>
      <i className="iconLapiz fa-solid fa-pen-to-square"></i>
      <i className="iconMouse fa-regular fa-hand-pointer"></i>
      <i className="iconFechaCreacion fa-regular fa-calendar-check"></i>
      <i className="iconFechaCierre fa-regular fa-calendar-xmark"></i>
      <i className="iconFechaActualizacion fa-solid fa-clock-rotate-left"></i>
      <i className="iconEnviado fa-solid fa-circle-check"></i> */}
      
      

      {/* ----------------FORMULARIO---------------- */}
      <div className="formularioTickets">
        <form>
          
          <div class="solicitante col-md-2 offset-md-2">
            <label class="form-label">Solicitante</label>
            <input class="input"/>
          </div>
          
          <div class="destinatario col-md-2 offset-md-2">
            <label className="">Destinatario</label>
            <select class="input select" aria-label="Default select example">
                <option selected>----------</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
          </div>
           
          <div class="fechaCreacion offset-md-1">
            <label class="">Fecha de creacion</label>
            <input className="input"/>
          </div>
          <div class="fechaActualizacion">
            <label class="">Fecha de actualización</label>
            <input className="input"/>
          </div>
          <div class="fechaCierre">
            <label class="">Fecha de cierre</label>
            <input className="input"/>
          </div>

          <div class="asunto">
            <input placeholder='Asunto' className="text-center input-text"/>
          </div>

          <div class="descripcion">
            <input placeholder='Descripcion' className="text-center input-text"/>
          </div>
            
          {/* <div class="descripcion">
            <label class="">Descripcion</label>
            <input type="text" class="input"/>
          </div>  */}

          <div class="tipo col-md-2 offset-md-2">
            <label className="">Tipo</label>
            <select class="input select" aria-label="Default select example">
                <option selected>----------</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
          </div>

          {/* ----------------------------------Boton de enviar----------------------------- */}
          <div className=' col-md-4 mt-4'>
            <button type="button" class="enviar col-md-5 offset-md-4 btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Enviar</button>
          </div>

          {/* ----------------------------------Boton de confirmar----------------------------- */}
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Los datos estan correctos?</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Si así es de click en enviar
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-success">Si, enviar</button>
                </div>

              </div>
            </div>
          </div>
          <label htmlFor=""></label>
        </form>
      </div>
      
      <h1>.</h1>
    </div>
    </>
  )
}

export default CrearTickets;




