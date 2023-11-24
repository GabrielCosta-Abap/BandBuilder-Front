import ProfilePic from '../assets/no-profile-pic-avatar.png';
import CloseIcon from '@mui/icons-material/Close';
import '../css/NotificationItem.css';
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../service/Firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function ChatItem({ user, instrument, onMessage }) {
    const [imageUrl, setImageUrl] = useState(null);

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
            const id = user.user_id || user.band_id;
            const url = await getImageUrl('images/' + id);
            setImageUrl(url);
        };

        fetchImageUrl();
    }, []);

    return (
        <div className="notification-item">
            <div className="notification-item-content">
                <img src={imageUrl || ProfilePic} alt={user.name} className="avatar" />
                <div className="notification-item-details">
                    <p className="user-name">{user.name}</p>
                    <p className="user-city">{user.city}</p>
                    <p className="user-musical_genre">{user.musical_genre}</p>
                    <p className="user-instrument">{user.instruments}</p>
                </div>
            </div>
            <div className="notification-item-actions">
                <button onClick={onMessage} className="accept-button">
                    <WhatsAppIcon />
                </button>
            </div>
        </div>
    );
}

export default ChatItem;
