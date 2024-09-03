import React, { useState } from 'react';
//import { Password } from 'primereact/password';
//import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import { Message } from 'primereact/message';

import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import ScriptLogin from './ScriptLogin';

function Login() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //-----------------Boton-----------------
    /*const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };*/

    /*const handleEmail = (e) => {
        console.log('email = '+e.target.value);
        setEmail(e.target.value);
    }

    const handleContrasena = (e) => {
        console.log('contrasena: '+e.target.value);
        setContrasena(e.target.value);
    }*/

    const handleLogin = async (e) => {
        //console.log('logged in');

        e.preventDefault();

        /*let data = {
            'email': email,
            'contrasena': contrasena
        }

        axios({
            method: "POST",
            url: "http://localhost:3000/api/v1/usuarios/login",
            data: data
        }).then(res => {
            console.log(res, data);
            
            if (res.data) {
                window.localStorage.setItem('token', res.data.token);
                navigate("/");
            }
        }).catch(err => {
            console.log(err);
            setError('Credenciales invalidas');
        })*/

        try {
            const response = await axios.post('http://localhost:3000/api/v1/usuarios/login', { email, contrasena});
                //alert('Inicio de sesión exitoso');

                //Guardar token, id y rol del usuario en el localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id_usuarios);
                localStorage.setItem('userRole', response.data.rol);
                //console.log(response.data);  

                console.log(response.data.token);
                console.log(response.data.id_usuarios);
                console.log(response.data.rol);

                if (response.data.rol == 'admin') {
                    navigate('/');
                } else if (response.data.rol == 'user') {
                    navigate('/home-user');
                } else if (response.data.rol == 'contador') {
                    navigate('/home-contador');
                } else if (response.data.rol == 'auxiliar') {
                    navigate('/home-auxiliar');
                } else {
                    navigate('/login');
                }

                //Dirigir al home
                //navigate('/');

        } catch (error) {
            alert('Credenciales inválidas');
            console.error(error);
        } 
    };

    
    
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/v1/usuarios/register', {
                nombre, 
                email,
                contrasena
            });
            alert('Usuario registrado exitosamente');
        } catch (err) {
            setError('Error al registrar usuario');
        }
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

                        {/* ----------------formulario de login---------------- */}
                        <div className="contenedor__login-register">
                            <form onSubmit={handleLogin} action="" className="formulario__login">
                                <label htmlFor="" className='icon_user_login pi pi-user'></label><br />
                                <h2>Iniciar Sesión</h2>
                                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email'/>
                                <input required value={contrasena} onChange={(e) => setContrasena(e.target.value)} type="password" placeholder='contraseña' />
                                {/* <InputText type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='correo' aria-describedby="username-help"/> */}
                                {/* <Password value={password} onChange={(e) => setPassword(e.target.value)}  required placeholder='contraseña' toggleMask/>       */}
                                <Button type='submit' label="Entrar" icon="pi pi-check"/>
                            </form>

                        {/* ----------------formulario de Registro de usuario---------------- */}

                            <form onSubmit={handleRegister} className="formulario__register">
                            {/* <label htmlFor="" className='icon_user_register pi pi-user-plus'></label> */}
                                <h2 className='m_top-y'>Registrate <i className='icon_user_register pi pi-user-plus'></i></h2>
                                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='nombre completo' />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
                                <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder='contraseña' />
                                {/* <InputText required placeholder='Nombre completo' />
                                <InputText required placeholder='correo' aria-describedby="username-help" />
                                <Password placeholder='contraseña' value={value} onChange={(e) => setValue(e.target.value)} toggleMask/> */}
                                <Button label="Registrarse" icon="pi pi-save"  />
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Login;




/*<div className='login_body mainLogin'>
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
            */