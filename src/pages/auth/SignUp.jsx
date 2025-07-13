import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';

import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { Wrapper } from '~/styles/style';
import { exec } from '~/utils/exec';
import axiosClient from '~/config/axiosClient';

const signUpSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const res = await exec(
      () => axiosClient.post('/auth/sign-up', {
        prenom: data.firstName,
        nom: data.lastName,
        email: data.email,
        motDePasse: data.password,
      }),
      setLoading,
      setError
    );
    if (res) {
      navigate('/sign-in');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>BIENVENUE !</Title>
        <TitleH4>Créer un compte</TitleH4>
        <Para>Remplissez les champs pour vous inscrire</Para>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Prénom"
                {...register('firstName')}
                $borderRadius="6px"
                $width="100%"
              />
              {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}
            </InputWrapper>

            <InputWrapper>
              <Input
                type="text"
                placeholder="Nom"
                {...register('lastName')}
                $borderRadius="6px"
                $width="100%"
              />
              {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}
            </InputWrapper>
          </Row>

          <Row>
            <InputWrapperFull>
              <Input
                type="email"
                placeholder="Adresse e-mail"
                {...register('email')}
                $borderRadius="6px"
                $width="100%"
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </InputWrapperFull>
          </Row>

          <Row>
            <InputWrapperFull style={{ position: 'relative' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                {...register('password')}
                $borderRadius="6px"
                $width="100%"
                style={{ paddingRight: '40px' }}
              />
              <TogglePasswordButton
                type="button"
                $hasError={!!errors?.password?.message}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </TogglePasswordButton>
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
            </InputWrapperFull>
          </Row>

          <Button type="submit" $width="100%" disabled={isSubmitting || loading} $borderRadius="6px">
            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
          </Button>

          {error && <ErrorText>{error || 'Une erreur est survenue'}</ErrorText>}
        </Form>

        <HaveAccount>
          Déjà un compte ?
          <StyledLink to='/sign-in'>Se connecter</StyledLink>
        </HaveAccount>
      </Container>
    </Wrapper>
  );
}


const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 60px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
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
  gap: 16px;
  align-items: center;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
`;

const InputWrapperFull = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: ${({ $hasError }) => ($hasError ? 'translateY(-80%)' : 'translateY(-50%)')} ;
  
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
`;

const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 13px;
  margin-top: 4px;
  align-self: flex-start;
`;


const HaveAccount = styled.p`
  font-size: 14px;
  color: #333;
  margin-top: 16px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  margin-left: 4px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
