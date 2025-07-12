import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';    
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { Wrapper } from '~/styles/style';

function SignUp() {
  const navigate = useNavigate()
  
  const submitEmail = () => {
    navigate('/sign-in')
  };

  return (
    <Wrapper>
      <Container>
        <Title>WELCOME !</Title>
        <TitleH4>Create an account</TitleH4>
        <Para>Enter your email to sign up for the platform</Para>

        <Row>
          <Input type='email' id='email' placeholder='Enter your email' />
          <Input type='password' id='password' placeholder='Enter your password' />
          <Button onClick={submitEmail}>Continue</Button>
        </Row>

        <Divider>or</Divider>

        <ButtonGroup>
          <FirstButton>
            Continue with Google
          </FirstButton>

          <SecondButton>
            <Image
              src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
              alt='Apple logo'
            />
            Continue with Apple
          </SecondButton>
        </ButtonGroup>

        <Other>
          By clicking continue, you agree to our <span>Terms of Service</span> and{' '}
          <span>Privacy Policy</span>.
        </Other>

        <HaveAccount>
          Already have an account?
          <StyledLink to='/sign-in'>Sign in</StyledLink>
        </HaveAccount>
      </Container>
    </Wrapper>
  );
}

export default SignUp;

/* ---------- styled components ---------- */

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

const Divider = styled.p`
  color: #333;
  margin: 14px 0;
  font-size: 15px;
  font-style: italic;
`;

const Other = styled.p`
  font-size: 15px;
  color: #555;
  margin-top: 20px;

  span {
    color: #007bff;
    text-decoration: none;
    margin: 0 4px;
    cursor: pointer;
  }
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

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const ButtonGroup = styled.div`
  margin-left: 20px;
`;

const FirstButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  color: #000;
  border: 3px solid #ccc;
  margin-bottom: 10px;
`;

const SecondButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #000;
  color: rgba(255, 255, 255, 0.9);
  border: 3px solid #ccc;
`;

const Image = styled.img`
  width: 21px;
  height: 16px;
`;
