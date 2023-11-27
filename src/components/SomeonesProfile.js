// SomeonesProfile.js
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils';
import '../css/SomeonesProfile.css';

export default function SomeonesProfile() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const getImageUrl = async (imageName) => {
      try {
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);
        const imageRef = ref(storage, imageName);
        const imageUrl = await getDownloadURL(imageRef);
        return imageUrl;
      } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        return null;
      }
    };

    const fetchImageUrl = async () => {
      const params = new URLSearchParams(window.location.search);
      const userID = params.get('someonesId');

      const url = await getImageUrl('images/' + userID);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, []);

  const handleImageClick = () => {
    // Inverte o estado de ampliação ao clicar na imagem
    setIsZoomed(!isZoomed);
  };

  return (
    <div className={`someonesprofile-container ${isZoomed ? 'zoomed' : ''}`}>
      <div className='someonesprofile-user-pic' onClick={handleImageClick}>
        <img src={imageUrl} alt='User' />
      </div>

      <div className="someonesprofile-user-info">

      </div>

    </div>
  );
}
