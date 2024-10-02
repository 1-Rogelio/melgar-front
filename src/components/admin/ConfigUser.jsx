import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/images/usuario.png';

function ConfigUser() {
    const [imageUrl, setImageUrl] = useState(userImg);
    const [newImageUrl, setNewImageUrl] = useState('');
    const userId = sessionStorage.getItem('userId'); // Obtén el ID del local storage

    useEffect(() => {
        // Recupera la URL de la imagen del backend al montar el componente
        const fetchUserImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/usuarios/${userId}`);
                if (response.status === 200) {
                  const imgUrl = response.data.img || userImg;
                  setImageUrl(imgUrl); // Usa la imagen de la respuesta o una imagen por defecto
                  sessionStorage.setItem('userImage', imgUrl);
                }
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchUserImage();
    }, [userId]); // Dependencia en userId para volver a ejecutar si cambia

    const handleInputChange = (e) => {
        setNewImageUrl(e.target.value);
    };

    const handleUpload = async () => {
        if (newImageUrl && userId) {
            try {
                const response = await axios.patch(`http://localhost:3000/api/v1/usuarios/actualizar-imagen/${userId}`, {
                    img: newImageUrl
                });
                if (response.status === 200) {
                    setImageUrl(newImageUrl);
                    sessionStorage.setItem('userImage', newImageUrl);
                    setNewImageUrl('');
                    console.log('Imagen actualizada exitosamente');
                }
            } catch (error) {
                console.error('Error al subir la imagen:', error);
            }
        } else {
            console.error('Por favor, ingrese una URL válida o inicie sesión.');
        }
    };

    return (
        <>
            <div className='container_perfil'>
                <div className='box_center'>
                    <h1 className='m_top text_caption'>Perfil</h1>
                </div>

                <div className="botonExit">
                    <NavLink to="/">
                        <p className='botonExit pi pi-arrow-circle-left'></p>
                    </NavLink>
                </div>

                <div className='box_center'>
                    <img className='imagenConfig p_a' src={imageUrl} alt="Imagen de perfil" />
                    <div className='container_title_files c_black text_paragraphs m_top_medium'><br />
                        <p className='text_paragraphs'>Agregar foto de perfil</p>
                    </div>
                </div><br />

                <div className="container_subir_img box_center text-center">
                    <div className="label_subir_img">
                        <label htmlFor="" className='text_paragraphs'>Subir URL de la imagen</label>
                    </div>
                    <div className="input_subir_img">
                        <input 
                            type="text" 
                            className='form-control input_url text-center' 
                            value={newImageUrl} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="boton_subir_img">
                        <center><Button className='boton_add_img' label="Cargar"  icon="pi pi-check" onClick={handleUpload}/></center>
                    </div>
                    <div className="boton_subir_img">
                    <label htmlFor="" className='text_paragraphs'>CONVERTIR IMAGEN A URL</label>
                        <NavLink to="/convertir-imagen">
                            <center><Button className='boton_add_img' label="Convertir"  icon="pi pi-check"/></center>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfigUser;
