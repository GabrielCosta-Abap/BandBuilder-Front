import React from 'react';
import ProfilePic from '../assets/profilePic1.jpg';
import '../css/NotificationItem.css'

function NotificationItem({ user, instrument, onAccept, onReject }) {
  return (
    <div className="notification-item">
      <div className="notification-item-content">
        <img src={ProfilePic} alt={user} className="avatar"/>
        <div className="notification-item-details">
          <p className="user-name">{user.name}</p>
          <p className="user-city">{user.city}</p>
          <p className="user-musical_genre">{user.musical_genre}</p>
          <p className="user-instrument">{user.instruments}</p>
        </div>
      </div>
      <div className="notification-item-actions">
        <button onClick={onAccept} className="accept-button">Aceitar</button>
        <button onClick={onReject} className="reject-button">Recusar</button>
      </div>
    </div>
  );
}

export default NotificationItem;
