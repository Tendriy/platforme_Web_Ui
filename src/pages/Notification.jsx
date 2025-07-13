import React from 'react';
import '~/assets/styles/NotificationPage.css';
import profile from '../assets/images/me.jpeg';

const notifications = [
  {
    id: 1,
    premon: "Lova",
    nom: "Rakoto",
    contenu: "a publié une nouvelle annonce : Location de chambre meublée.",
    image: profile,
    date: "2025-07-12T10:00:00Z"
  },
  {
    id: 2,
    premon: "Fanja",
    nom: "Andrianina",
    contenu: "a commenté votre annonce.",
    image: profile,
    date: "2025-07-11T15:22:00Z"
  },
  {
    id: 3,
    premon: "Mickael",
    nom: "Rajaona",
    contenu: "a signalé une annonce suspecte.",
    image: profile,
    date: "2025-07-10T08:10:00Z"
  }
];

const Notification = () => {
  return (
    <div className="notification-container">
      <h2 className="notification-title">Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notif) => (
          <li key={notif.id} className="notification-item">
            <img src={notif.image} alt="profil" className="notification-avatar" />
            <div className="notification-content">
              <p>
                <strong>{notif.premon} {notif.nom}</strong> {notif.contenu}
              </p>
              <span className="notification-date">
                {new Date(notif.date).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
