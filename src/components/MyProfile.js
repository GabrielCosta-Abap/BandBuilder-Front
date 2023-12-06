import ProfilePic from '../assets/no-profile-pic-avatar.png';
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { obterIdDaRota } from '../utils';
import '../css/MyProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
   const [imageUrl, setImageUrl] = useState(null);
   const navigate = useNavigate();

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
         const userID = obterIdDaRota();

         if (userID) {
            const url = await getImageUrl(`images/${userID}`);
            setImageUrl(url);
         }
      };

      fetchImageUrl();
   }, []);

   const handleEditProfile = () => {
      const userID = obterIdDaRota();

      if (userID) {
         navigate(`/register/${userID}`, { state: { fromMyProfile: true } });
      }
   };

   return (
      <div className='myprofile-body'>
         <div className='myprofile-container'>
            <div className='wrap-pic-profile'>
               <div className='pic-profile'>
                  <img src={imageUrl || ProfilePic} alt='Usuário' />
               </div>
               <div className='edit-info-profile'>
                  <button onClick={handleEditProfile}>
                     <FontAwesomeIcon icon={faPencil} />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
