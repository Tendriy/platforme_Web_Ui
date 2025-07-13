import Avatar from '~/components/Avatar';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import axiosClient from '~/config/axiosClient';
import me from '~/assets/images/me.jpeg'
import useAuth from '~/hooks/useAuth';
import makeFullUrl from '~/utils/makeFullUrl';

function Sidebar() {
  const [annonces, setAnnonces] = useState([])
  const user = useAuth(state => state.user)

  const userInfo = useMemo(() => {
    return {
      image: makeFullUrl(user?.image, user?.isAuthGoogle),
      email: user?.email.toLowerCase() || '',
      nom: user?.nom.toLowerCase() || '',
      prenom: user?.prenom.toLowerCase() || ''
    };
  }, [user]);

  return (
    <SidebarStyled>
      <LogoTitle>
        Best
        <LogoSpan>Student</LogoSpan>
      </LogoTitle>
      <Row>
        {userInfo.image ? (
          <Avatar src={userInfo.image} alt="Avatar" size={90} />
        ) : (
          <Avatar src={me} alt="Avatar par défaut" size={90} />
        )}
      </Row>

      <ListContainer>
        <ListItem $bold $transform="capitalize">
          {userInfo.prenom} {userInfo.nom}
        </ListItem>

        <ListItem $transform="lowercase">
          {userInfo.email}
        </ListItem>
      </ListContainer>
      <pre>
        {JSON.stringify(annonces, null, 2)}
      </pre>
    </SidebarStyled>
  )
}

export default Sidebar

const SidebarStyled = styled.aside`
  width: 350px;
  background-color: #ecf0f1;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const LogoSpan = styled.span`
  color: #007bff;
`

const LogoTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-style: italic;
  text-align: center;
`

const Row = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ListContainer = styled.ul`
  text-align: center;
  list-style: none;
  padding: 20px;

`
const ListItem = styled.li`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: ${(props) => (props.$bold ? 'bold' : 'normal')};
  text-transform: ${(props) => props.$transform || 'none'};

  `