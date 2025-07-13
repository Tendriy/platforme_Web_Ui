import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert(`Un code OTP a été envoyé à ${email}`);
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '123456') {
      setStep(3);
    } else {
      alert('Code OTP invalide');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert('Mot de passe réinitialisé avec succès');
    setStep(1);
    setEmail('');
    setOtp('');
    setNewPassword('');
  };

  return (
    <Wrapper>
      <Container>
        <Title>Récupération <Highlight>mot de passe</Highlight></Title>

        {step === 1 && (
          <>
            <Description>Entrez votre adresse e-mail pour recevoir un code OTP.</Description>
            <Form onSubmit={handleEmailSubmit}>
              <StyledInput
                type="email"
                placeholder="Adresse e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledButton type="submit">Envoyer le code</StyledButton>
            </Form>
          </>
        )}

        {step === 2 && (
          <>
            <Description>Entrez le code OTP envoyé à votre e-mail.</Description>
            <Form onSubmit={handleOtpSubmit}>
              <StyledInput
                type="text"
                placeholder="Code OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <StyledButton type="submit">Vérifier</StyledButton>
            </Form>
          </>
        )}

        {step === 3 && (
          <>
            <Description>Définissez un nouveau mot de passe.</Description>
            <Form onSubmit={handlePasswordSubmit}>
              <StyledInput
                type="password"
                placeholder="Nouveau mot de passe"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <StyledButton type="submit">Réinitialiser</StyledButton>
            </Form>
          </>
        )}

        <BackToLogin>
          <StyledLink to="/sign-in">← Retour à la connexion</StyledLink>
        </BackToLogin>
      </Container>
    </Wrapper>
  );
}

// 🔵 Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 420px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #111;
  margin-bottom: 10px;
`;

const Highlight = styled.span`
  color: #007bff;
`;

const Description = styled.p`
  font-size: 15px;
  color: #555;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const BackToLogin = styled.div`
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default ForgetPassword;
