import ProfilePic from '../assets/no-profile-pic-avatar.png';
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from "firebase/app";

export default function ProfileCard({ profile }) {
    const [imageUrl, setImageUrl] = useState(null);
    const id = profile.band_id || profile.user_id;

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
            const url = await getImageUrl('images/' + id);
            setImageUrl(url);
        };

        fetchImageUrl();
    }, [id]);

    const navToHome = (e, key) => {
        window.location.href = '/home?id=' + key;
    };

    return (
        <div className='item' onClick={(e) => navToHome(e, id)}>
            <div className='image'>
                <img src={imageUrl || ProfilePic} alt='profile pic' />
            </div>
            <div className='info'>
                <span className='name'>{profile.name}</span>
            </div>
        </div>
    );
}
