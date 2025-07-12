import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { Wrapper } from '~/styles/style';

function SignIn() {
    const navigate = useNavigate()

    const login = () => {
        navigate('/')
    };

    return (
        <Wrapper>
            <Container>
                <Title>Create your password</Title>
                <Row>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <Button onClick={login}>Login</Button>
                </Row>


                <NoAccount>
                    Don’t have an account?
                    <StyledLink to="/sign-up">Sign up</StyledLink>
                </NoAccount>
            </Container>
        </Wrapper>
    );
}

export default SignIn;


const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  padding: 60px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width:500px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 24px;
  color: #000;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
`;

const NoAccount = styled.p`
  font-size: 14px;
  color: #333;
  margin-top: 20px;
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
