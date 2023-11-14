import '../css/Register.css';

import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { initializeApp } from "firebase/app";

import { getStorage, ref, uploadBytes } from 'firebase/storage';

import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { v4 } from 'uuid';

function UploadPic() {
    const firebaseConfig = {
        apiKey: "AIzaSyAb48ABVUf4m8XkgaJ2bQ-XuwPCre14DXg",
        authDomain: "files-upload-4c62e.firebaseapp.com",
        projectId: "files-upload-4c62e",
        storageBucket: "files-upload-4c62e.appspot.com",
        messagingSenderId: "478210390377",
        appId: "1:478210390377:web:753b98776d6278f434a5f8",
        measurementId: "G-KTVWMS7SB8"
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const [imageUpload, setImageUpload] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [userID, setIdUser] = useState(null);
    const location = useLocation();
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const userIdParam = queryParams.get('userID');
      if (userIdParam) {
        setIdUser(userIdParam);
      }
    }, [location.search]);
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        // Se não houver imagem selecionada, limpe a pré-visualização
        if (!selectedImage) {
            setPreviewImage(null);
            return;
        }

        // Use FileReader para ler o conteúdo da imagem e gerar uma URL de dados
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedImage);

        // Atualize o estado da imagem selecionada
        setImageUpload(selectedImage);
    };
    const uploadImage = () => {
        if (imageUpload == null) return;
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
        const fileExtension = imageUpload.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            alert('Por favor, selecione uma imagem do tipo JPG, JPEG ou PNG.');
            return;
        }
        const imageRef = ref(storage, `images/${userID}`);
        const metadata = {
            contentType: `image/${fileExtension}`,
          };
        uploadBytes(imageRef, imageUpload,metadata).then(() => {
            window.location = `/`;
        })

    };
    return (
        <div className="upload-container">
            <div className="wrap-upload">
                <h3 className='tittle-pic'>Foto de Perfil</h3>
                <div className='btn-input-file'>
                    <label htmlFor="fileInput" className="custom-file-input">
                        Escolher foto
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                {previewImage && (
                    <div className="image-preview">
                        <img src={previewImage} alt="Preview" />
                    </div>
                )}
                <div className='btn-upload-pic'>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={uploadImage}
                    >
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UploadPic