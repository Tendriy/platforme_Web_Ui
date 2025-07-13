import React from 'react';
import styled from 'styled-components';
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

function Notification() {
  return (
    <Container>
      <Title>Notifications</Title>
      <List>
        {notifications.map((notif) => (
          <Item key={notif.id}>
            <Avatar src={notif.image} alt="profil" />
            <Content>
              <p>
                <strong>{notif.premon} {notif.nom}</strong> {notif.contenu}
              </p>
              <DateText>{new Date(notif.date).toLocaleString()}</DateText>
            </Content>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default Notification;

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
  }
`;

const DateText = styled.span`
  font-size: 0.85rem;
  color: #888;
`;
