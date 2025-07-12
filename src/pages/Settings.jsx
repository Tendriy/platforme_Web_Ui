import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simuler la déconnexion
    localStorage.removeItem('token'); // si tu utilises un token
    navigate('/sign-in'); // redirige vers page de connexion
  };

  return (
    <Container>
      <Title>Paramètres</Title>

      <Section>
        <Subtitle>🎯 Aide</Subtitle>
        <HelpText>
          Cette plateforme vous permet de discuter, d'envoyer des messages, et de gérer vos paramètres personnels.
          Pour utiliser la messagerie, cliquez sur "Message" dans le menu.  
          Pour changer de mot de passe ou consulter votre profil, allez dans votre tableau de bord.
        </HelpText>
      </Section>

      <Section>
        <Subtitle>🔐 Déconnexion</Subtitle>
        <LogoutButton onClick={handleLogout}>Se déconnecter</LogoutButton>
      </Section>
    </Container>
  );
}

export default Settings;


const Container = styled.div`
  padding: 40px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  height: 50vh;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  color: #222;
`;

const Section = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const HelpText = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: orange;
  }
`;
