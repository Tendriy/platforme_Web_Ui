import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosClient from '~/config/axiosClient';

function Message() {
  const [amis, setAmis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const fetchAmis = async () => {
      try {
        const response = await axiosClient.get('/friends/amis');
        setAmis(response.data);
      } catch (err) {
        setErreur("Erreur lors du chargement des amis.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAmis();
  }, []);

  return (
    <Container>
      <Title>💬 Messagerie</Title>

      {loading && <Info>Chargement...</Info>}
      {erreur && <Erreur>{erreur}</Erreur>}

      <FriendList>
        {amis.map((ami) => (
          <Friend key={ami.id}>
            <Avatar src={ami.image || '/default-avatar.png'} alt={ami.nom} />
            <FriendInfo>
              <Name>{ami.prenom} {ami.nom}</Name>
              <Email>{ami.email}</Email>
            </FriendInfo>
          </Friend>
        ))}
      </FriendList>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #222;
`;

const Info = styled.p`
  text-align: center;
  font-style: italic;
  color: #888;
`;

const Erreur = styled.p`
  text-align: center;
  color: red;
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const Friend = styled.div`
  display: flex;
  align-items: center;
  background: #f4f4f4;
  border-radius: 10px;
  padding: 10px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: bold;
  color: #333;
`;

const Email = styled.span`
  font-size: 14px;
  color: #666;
`;
