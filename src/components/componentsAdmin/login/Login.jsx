import '../../../assets/js/script'
import './Login.css';

function Login() {

    return(
        <>
        <main>
            <div className="contenedor__todo">
                <div className="caja__trasera">
                    <div class="caja__trasera-login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar-sesion">Iniciar Sesión</button>
                    </div>
                </div>

                <div className="contenedor__login-register">
                    <form action="" className="formulario__login">
                        <h2>Iniciar Sesion</h2>
                        <input type="text" placeholder="Correo Electronico"/>
                        <input type="password" placeholder="Contraseña"/>
                        <button>Entrar</button>
                    </form>

                    <form action="" class="formulario__register">
                        <h2>Regístrarse</h2>
                        <input type="text" placeholder="Nombre completo"/>
                        <input type="text" placeholder="Correo Electronico"/>
                        <input type="password" placeholder="Contraseña"/>
                        <button>Regístrarse</button>
                    </form>
                </div>
            </div>
        </main>

        </>
    )
    
}

export default Login;