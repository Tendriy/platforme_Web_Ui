import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';

import { Wrapper } from '~/styles/style';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '~/config/axiosClient';
import useAuth from '~/hooks/useAuth';
import { exec } from '~/utils/exec';


const signInSchema = z.object({
  email: z.email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Mot de passe trop court (6 caractères minimum)' }),
});

function SignIn() {
  const navigate = useNavigate();
  const login = useAuth(state => state.login)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    const res = await exec(
      () => axiosClient.post('/auth/sign-in', {
        email: data.email,
        motDePasse: data.password,
      }),
      setLoading,
      setError
    );
    if (res) {
      const { accessToken, refreshToken } = res.data;
      try {
        const profileRes = await axiosClient.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user = profileRes.data;
        login({ accessToken, refreshToken }, user);
        navigate('/');
      } catch (profileError) {
        setError({ message: 'Impossible de récupérer le profil utilisateur' });
      }
    }
  };


  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <Wrapper>
      <Container>
        <Title>
          Bienvenue sur <Highlight>Plateforme</Highlight>
        </Title>

        <Para>Connectez-vous pour accéder à votre compte</Para>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            id="email"
            placeholder="Adresse e-mail"
            $borderRadius="6px"
            {...register('email')}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Input
            type="password"
            id="password"
            placeholder="Mot de passe"
            $borderRadius="6px"
            {...register('password')}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <Button type="submit" $borderRadius="6px" disabled={isSubmitting || loading}>
            {loading ? 'Chargement...' : 'Se connecter'}
          </Button>

          {error && <ErrorText>{error.message || 'Une erreur est survenue'}</ErrorText>}
        </Form>

        <Divider>ou</Divider>

        <Button type="button"
          onClick={handleGoogleSignIn}
          $borderRadius="6px">
          Continuer avec Google
        </Button>

        <HaveAccount>
          <StyledLink to="/sign-up">Vous avez déjà un compte ?</StyledLink>
          <ForgotPasswordLink to="/forgot-password">Mot de passe oublié ?</ForgotPasswordLink>
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
  gap: 8px;
  align-items: center;
`;

const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 13px;
  margin-left: 10px;
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
