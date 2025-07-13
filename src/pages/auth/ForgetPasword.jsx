import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { Wrapper } from '~/styles/style';
import axiosClient from '~/config/axiosClient';
import { exec } from '~/utils/exec';

const emailSchema = z.object({
  email: z.email("Email invalide"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "Code OTP requis"),
});

const passwordSchema = z.object({
  password: z.string().min(6, "Mot de passe trop court"),
});

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const {
    register: registerEmail,
    getValues: getValuesEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
  } = useForm({ resolver: zodResolver(emailSchema) });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
   formState: { errors: otpErrors, isSubmitting: isSubmittingOtp },
  } = useForm({ resolver: zodResolver(otpSchema) });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
     formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm({ resolver: zodResolver(passwordSchema) });

  const onEmailSubmit = async (data) => {
    const res = await exec(
      () => axiosClient.post('/auth/request-reset', { email: data.email }),
      setLoading,
      setError
    );
    if (res) {
      setStep(2);
    }
  };

  const onOtpSubmit = async (data) => {
    const res = await exec(
      () => axiosClient.post('/auth/verify-otp', {
        email: getValuesEmail('email'),
        otpCode: data.otp,
      }),
      setLoading,
      setError
    );
    if (res) {
      setStep(3);
    }
  };

  const onPasswordSubmit = async (data) => {
    const res = await exec(
      () => axiosClient.post('/auth/reset-password', {
        email: getValuesEmail('email'),
        newPassword: data.password,
      }),
      setLoading,
      setError
    );
    if (res) {
      setStep(1);
      navigate("/sign-in")
    }
  };


  return (
    <Wrapper>
      <Container>
        <Title>BIENVENUE !</Title>
        <TitleH4>Récupération mot de passe</TitleH4>

        {step === 1 && (
          <>
            <Para>Entrez votre adresse e-mail pour recevoir un code OTP.</Para>
            <Form onSubmit={handleSubmitEmail(onEmailSubmit)}>
               {error && <Error>{error}</Error>}
              <Input
                type="email"
                placeholder="Adresse e-mail"
                $borderRadius="6px"
                $width="100%"
                {...registerEmail('email')}
              />
              {emailErrors.email && <Error>{emailErrors.email.message}</Error>}
              <Button type="submit" disabled={isSubmittingEmail || loading} $borderRadius="6px" $width="100%">
                 {loading ? 'Envoi...' : 'Envoyer le code'}
              </Button>
            </Form>
          </>
        )}

        {step === 2 && (
          <>
            <Para>Entrez le code OTP envoyé à votre e-mail.</Para>
            <Form onSubmit={handleSubmitOtp(onOtpSubmit)}>
               {error && <Error>{error}</Error>}
              <Input
                type="text"
                placeholder="Code OTP"
                $borderRadius="6px"
                $width="100%"
                {...registerOtp('otp')}
              />
              {otpErrors.otp && <Error>{otpErrors.otp.message}</Error>}
              <Button type="submit" disabled={isSubmittingOtp || loading} $borderRadius="6px" $width="100%">
                 {loading ? 'Vérification...' : 'Vérifier'}
              </Button>
            </Form>
          </>
        )}

        {step === 3 && (
          <>
            <Para>Définissez un nouveau mot de passe.</Para>
            <Form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
               {error && <Error>{error}</Error>}
              <Input
                type="password"
                placeholder="Nouveau mot de passe"
                $borderRadius="6px"
                $width="100%"
                {...registerPassword('password')}
              />
              {passwordErrors.password && <Error>{passwordErrors.password.message}</Error>}
              <Button type="submit" disabled={isSubmittingPassword || loading} $borderRadius="6px" $width="100%">
                  {loading ? 'Réinitialisation...' : 'Réinitialiser'}
              </Button>
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

const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 420px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 35px;
  margin-bottom: 20px;
  color: #000;
`;

const TitleH4 = styled.h4`
  margin: 8px 0;
  font-size: 18px;
`;

const Para = styled.p`
  color: #333;
  margin-bottom: 20px;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

const Error = styled.span`
  font-size: 13px;
  color: #d32f2f;
  text-align: left;
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


export default ForgetPassword