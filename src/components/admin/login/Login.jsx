import React, { useState, useRef } from 'react';
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import axios from 'axios'
// import { Message } from 'primereact/message';

import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import ScriptLogin from './ScriptLogin';

function Login() {

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] =useState('')
    const [apellidoMaterno, setApellidoMaterno] =useState('')

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const toast = useRef(null);
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
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userId', response.data.id_usuarios);
                sessionStorage.setItem('userRole', response.data.rol);
                sessionStorage.setItem('nombre', response.data.nombre);
                sessionStorage.setItem('apellidoPaterno', response.data.apellidoPaterno);
                // sessionStorage.setItem('img', response.data.img || userImg);
                //console.log(response.data);  

                // console.log(response.data.token);
                console.log(response.data.id_usuarios);
                console.log(response.data.rol);
                console.log(response.data.nombre);
                console.log(response.data.apellidoPaterno);
                // console.log(response.data.img);
                
                Swal.fire({
                    title: 'Bienvenido!',
                    text: `Hola ${response.data.nombre}, has iniciado sesión como ${response.data.rol}`,
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirigir según el rol del usuario
                        if (response.data.rol === 'admin') {
                            navigate('/');
                        } else if (response.data.rol === 'user') {
                            navigate('/home-user');
                        } else if (response.data.rol === 'contador') {
                            navigate('/home-contador');
                        } else if (response.data.rol === 'auxiliar') {
                            navigate('/home-auxiliar');
                        } else {
                            navigate('/login');
                        }
                    }
                });

                //Dirigir al home
                //navigate('/');

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas', life: 3000 });
            console.error(error);
        } 
    };

    
    
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/v1/usuarios/register', {
                nombre,
                apellidoPaterno,
                apellidoMaterno, 
                email,
                contrasena
            });
            toast.current.show({severity:'success', summary: 'Success', detail:'Usuario Registrado', life: 3000});
            //Limpiar inpust al registrar
            setNombre('');
            setApellidoPaterno('');
            setApellidoMaterno('');
            setEmail('');
            setContrasena('');
            
        } catch (err) {
            if (err.response && err.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo en uso',
                    text: 'El correo ingresado ya está registrado. Intenta con otro.',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al registrar usuario', life: 3000 });
            }
        }    
    };

    ScriptLogin();

    return (
        <>   
             <Toast ref={toast} /> {/* Toast component */}      
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
                                <InputText id="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' required/>
                                <input required value={contrasena} onChange={(e) => setContrasena(e.target.value)} type="password" placeholder='contraseña'/>
                                {/* <Password placeholder='contraseña' type='password' value={contrasena} onChange={(e) => setContrasena(e.target.value)} toggleMask required /> */}
                                   
                                {/* <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email'/>
                                <input required value={contrasena} onChange={(e) => setContrasena(e.target.value)} type="password" placeholder='contraseña' /> */}
                                {/* <InputText type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='correo' aria-describedby="username-help"/> */}
                                {/* <Password value={password} onChange={(e) => setPassword(e.target.value)}  required placeholder='contraseña' toggleMask/>       */}
                                <Button type='submit' label="Entrar" icon="pi pi-check"/>
                            </form>

                        {/* ----------------formulario de Registro de usuario---------------- */}

                            <form onSubmit={handleRegister} className="formulario__register">
                            {/* <label htmlFor="" className='icon_user_register pi pi-user-plus'></label> */}
                                <h2 className='m_top-y'>Registrate <i className='icon_user_register pi pi-user-plus'></i></h2>
                                <FloatLabel>
                                    <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                                    <label htmlFor="nombre">Nombre(s)</label>
                                </FloatLabel>

                                <FloatLabel>
                                    <InputText id="apellidoPaterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} required />
                                    <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                                </FloatLabel>

                                <FloatLabel>
                                    <InputText id="apellidoMaterno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} required />
                                    <label htmlFor="apellidoMaterno">Apellido Materno</label>
                                </FloatLabel>

                                <FloatLabel>
                                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    <label htmlFor="email">Email</label>
                                </FloatLabel>

                                <FloatLabel>
                                    <Password value={contrasena} onChange={(e) => setContrasena(e.target.value)} toggleMask required/>
                                    <label htmlFor="contrasena">Contraseña</label>
                                </FloatLabel>
                                {/* <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='nombre(s)' />
                                <input required type="text" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} placeholder='apellido paterno'/>
                                <input type="text" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} placeholder='apellido materno' />
                                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
                                <input required type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder='contraseña' /> */}
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