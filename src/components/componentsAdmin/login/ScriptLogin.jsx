import { useEffect } from 'react';

const ScriptLogin = () => {

    useEffect(() => {
        const btnIniciarSesion = document.getElementById("btn__iniciar-sesion");
        const btnRegistrarse = document.getElementById("btn__registrarse");
        const formulario_login = document.querySelector(".formulario__login");
        const formulario_register = document.querySelector(".formulario__register");
        const contenedor_login_register = document.querySelector(".contenedor__login-register");
        const caja_trasera_login = document.querySelector(".caja__trasera-login");
        const caja_trasera_register = document.querySelector(".caja__trasera-register");

        const anchoPage = () => {
            if (window.innerWidth > 850) {
                caja_trasera_register.style.display = "block";
                caja_trasera_login.style.display = "block";
            } else {
                caja_trasera_register.style.display = "block";
                caja_trasera_register.style.opacity = "1";
                caja_trasera_login.style.display = "none";
                formulario_login.style.display = "block";
                contenedor_login_register.style.left = "0px";
                formulario_register.style.display = "none";
            }
        };

        const iniciarSesion = () => {
            if (window.innerWidth > 850) {
                formulario_login.style.display = "block";
                contenedor_login_register.style.left = "10px";
                formulario_register.style.display = "none";
                caja_trasera_register.style.opacity = "1";
                caja_trasera_login.style.opacity = "0";
            } else {
                formulario_login.style.display = "block";
                contenedor_login_register.style.left = "0px";
                formulario_register.style.display = "none";
                caja_trasera_register.style.display = "block";
                caja_trasera_login.style.display = "none";
            }
        };

        const register = () => {
            if (window.innerWidth > 850) {
                formulario_register.style.display = "block";
                contenedor_login_register.style.left = "410px";
                formulario_login.style.display = "none";
                caja_trasera_register.style.opacity = "0";
                caja_trasera_login.style.opacity = "1";
            } else {
                formulario_register.style.display = "block";
                contenedor_login_register.style.left = "0px";
                formulario_login.style.display = "none";
                caja_trasera_register.style.display = "none";
                caja_trasera_login.style.display = "block";
                caja_trasera_login.style.opacity = "1";
            }
        };

        btnIniciarSesion.addEventListener("click", iniciarSesion);
        btnRegistrarse.addEventListener("click", register);
        window.addEventListener("resize", anchoPage);

        // Ejecutar anchoPage al cargar el componente
        anchoPage();

        // Limpiar los event listeners al desmontar el componente
        return () => {
            btnIniciarSesion.removeEventListener("click", iniciarSesion);
            btnRegistrarse.removeEventListener("click", register);
            window.removeEventListener("resize", anchoPage);
        };
    }, []);

}

export default ScriptLogin;