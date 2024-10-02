import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

function ConvertirImgContador() {

    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <>
    
    <div className="container_convertir_img">
        <div className="botonExit">
            <NavLink to="/configuracion-contador">
                <p className='botonExit pi pi-arrow-circle-left'></p>
            </NavLink>
        </div>

        <center>
        <div><br /><br />
            <h2>Sube una imagen</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {imageUrl && (
                <div><br /><br />
                <h3>Vista previa de la imagen:</h3>
                <img src={imageUrl} alt="Vista previa" style={{ width: '200px', height: '200px' }} />
                
                <h3>URL de la imagen:</h3>
                {/* Mostrando la URL en un label */}
                <label className='text_paragraphs_blue'>{imageUrl}</label>

                {/* Si prefieres un input */}
                {/* <input type="text" value={imageUrl} readOnly /> */}
                </div>
            )}
        </div>
        </center>
    </div>
    
    </>
  );
}

export default ConvertirImgContador;
