import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import userImg from '../../assets/images/usuario.png';

function ConfigAuxiliar() {

  const [imageUrl, setImageUrl] = useState(userImg);
    const [previewImage, setPreviewImage] = useState(null); // Estado para la vista previa de la imagen
    const [file, setFile] = useState(null);
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

  const handleFileChange  = (e) => {
    const file = e.target.files[0]; // Actualiza el estado con el archivo seleccionado
    if (file) {
        setFile(file); // Guarda el archivo seleccionado
        setPreviewImage(URL.createObjectURL(file)); // Genera una URL de vista previa de la imagen
    }
};

const handleCancel = () => {
    // Limpia la vista previa y el archivo seleccionado
    setPreviewImage(null);
    setFile(null);
};

const handleUpload = async () => {
  if (file && userId) {
      const formData = new FormData();
      formData.append('img', file);

      try {
          const response = await axios.patch(`http://localhost:3000/api/v1/usuarios/actualizar-imagen/${userId}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          if (response.status === 200) {
              setImageUrl(response.data.img);
              sessionStorage.setItem('userImage', response.data.img);
              setFile(null); //Limpia el archivo seleccionado después de cargar
              setPreviewImage(null); // Limpia la vista previa después de cargar
              console.log('Imagen actualizada exitosamente');

              // Muestra el alert de éxito
              Swal.fire({
                  icon: 'success',
                  title: 'Imagen actualizada correctamente',
                  showConfirmButton: false,
                  timer: 1500
              });
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
    
    <div className="container_perfil">

      <div className="box_center">
        <h1 className='m_top text_caption'>Perfil</h1>
      </div>

      <div className="botonExit">
        <NavLink to='/home-auxiliar'>
          <p className='botonExit pi pi-arrow-circle-left'></p>
        </NavLink>
      </div>

      <div className='box_center'>
          <img 
            className='imagenConfig p_a' 
            src={previewImage || imageUrl} // Muestra la vista previa o la imagen actual
            alt="Imagen de perfil" 
            />
            <div className='container_title_files c_black text_paragraphs m_top_medium'><br />
              <p className='text_paragraphs'>Agregar foto de perfil</p>
            </div>
      </div><br />

      <div className="container_subir_img box_center text-center">
          <div className="input_subir_img">
              <input 
                type="file" 
                className='form-control input_file' 
                accept="image/*" 
                onChange={handleFileChange} 
              />
          </div>
          <div className="boton_subir_img">
              <center>
                <Button className='boton_add_img' label="Subir Imagen" icon="pi pi-check" onClick={handleUpload} disabled={!file}/>
                  {previewImage && (
                    <Button 
                      className='boton_cancel_img' 
                      label="Cancelar" 
                      icon="pi pi-times" 
                      onClick={handleCancel} 
                      style={{ marginLeft: '10px' }} // Espacio entre los botones
                    />
                  )}
              </center>
          </div>          
        </div>
    </div>    
    </>
  );
}

export default ConfigAuxiliar;
