import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';

import { Wrapper } from '~/styles/style';

function SignIn() {
  const navigate = useNavigate();

  const submitEmail = () => {
    navigate('/sign-in');
  };

  return (
    <Wrapper>
      <Container>
        <Title>
          Bienvenue sur <Highlight>Plateforme</Highlight>
        </Title>

        <Para>
          Connectez-vous pour accéder à votre compte
        </Para>

        <Form>
          <Input
            type="email"
            id="email"
            placeholder="Adresse e-mail"
          />

          <Input
            type="password"
            id="password"
            placeholder="Mot de passe"
          />

          <Button onClick={submitEmail}>
            Se connecter
          </Button>
        </Form>

        <Divider>ou</Divider>

        <Button>
          Continuer avec Google
        </Button>

        <HaveAccount>
          <StyledLink to="/sign-in">
            Vous avez déjà un compte ?
          </StyledLink>

          <ForgotPasswordLink to="/forgot-password">
            Mot de passe oublié ?
          </ForgotPasswordLink>
        </HaveAccount>
      </Container>
    </Wrapper>
  );
}


const Container = styled.div`
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  padding: 38px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 430px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #111;
  margin-bottom: 12px;
`;

const Highlight = styled.span`
  color: #007bff;
`;

const Para = styled.p`
  color: #555;
  margin-bottom: 24px;
  font-size: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPasswordLink = styled(Link)`
  color: #007bff;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


const Divider = styled.div`
  margin: 24px 0;
  font-size: 14px;
  color: #999;
  position: relative;
  font-style: italic;
`;

const HaveAccount = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #444;
  display: flex;
  flex-direction: column; 
  align-items: center;
  gap: 6px; 
`;


export default SignIn;
