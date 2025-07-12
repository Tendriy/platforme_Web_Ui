import bg from '~/assets/images/bg-auth.jpg';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <Header>Bienvenue sur la plateforme</Header>

      <Center>
        <Quote>
          « Se réunir est un début, rester ensemble est un progrès, travailler ensemble est la réussite. »
        </Quote>
      </Center>

      <BottomRight>
        <StyledLink to="/sign-up">se connecté</StyledLink>
      </BottomRight>
    </Wrapper>
  );
}

export default SignIn;
const Wrapper = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  position: relative;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  position: absolute;
  margin-top: 150px;
  width: 100%;
  text-align: center;
  font-size: 70px;
  color: #fff;
  font-weight: bold;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  border-radius: 15px;
`;

const Quote = styled.h4`
  font-size:25px;
  color: #fcfbfb;
`;

const BottomRight = styled.div`
  position: absolute;
  margin-top: 730px;
  margin-left:130vh;

`;


const StyledLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: #0f0f0f;
  background-color: #fefeff;
  padding: 14px 17px;
  border-radius: 6px;
  text-decoration: none;
  outline: 4px solid black;
  padding-top: -170px;

  &:hover {
    text-decoration: underline;
  }
`;
