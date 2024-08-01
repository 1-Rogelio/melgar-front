import React, { useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
// import { Message } from 'primereact/message';

import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import ScriptLogin from './ScriptLogin';

function Login() {

    const [value, setValue] = useState('');

    //-----------------Boton-----------------
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    ScriptLogin();

    return (
        <>
            <div className='login_body mainLogin'>
                <main>
                    <div className="contenedor__todo">
                        <div className="caja__trasera">
                            <div className="caja__trasera-login">
                                <h3>¿Ya tienes una cuenta?</h3>
                                <p>Inicia sesión para entrar en la página</p>
                                <button id="btn__iniciar-sesion">Iniciar Sesión</button>
                            </div>
                            <div className="caja__trasera-register">
                                <h3>¿Aún no tienes una cuenta?</h3>
                                <p>Regístrate para que puedas iniciar sesión</p>
                                <button id="btn__registrarse">Registrarse</button>
                            </div>
                        </div>

                        <div className="contenedor__login-register">
                            <form action="" className="formulario__login">
                                <label htmlFor="" className='icon_user_login pi pi-user'></label><br />
                                <h2>Iniciar Sesión</h2>
                                <InputText required id="username" placeholder='correo' aria-describedby="username-help"/>
                                    <Password required placeholder='contraseña' value={value} onChange={(e) => setValue(e.target.value)} toggleMask/>      
                                <Button label="Entrar" icon="pi pi-check" loading={loading} onClick={load} />
                            </form>

                            <form action="" className="formulario__register">
                            {/* <label htmlFor="" className='icon_user_register pi pi-user-plus'></label> */}
                                <h2 className='m_top-y'>Registrate <i className='icon_user_register pi pi-user-plus'></i></h2>
                                <InputText required placeholder='Nombre completo' value={value} onChange={(e) => setValue(e.target.value)} />
                                <InputText required id="username" placeholder='correo' aria-describedby="username-help" />
                                <Password placeholder='contraseña' value={value} onChange={(e) => setValue(e.target.value)} toggleMask/>
                                <Button label="Registrarse" icon="pi pi-save" loading={loading} onClick={load} />
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Login;
