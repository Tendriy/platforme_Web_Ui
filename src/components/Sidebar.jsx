import Avatar from '~/components/Avatar';
import me from '~/assets/images/me.jpeg'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axiosClient from '~/config/axiosClient';

function Sidebar() {
  const [annonces, setAnnonces] = useState([])
  const [id, setId] = useState(9)
  const fakeEmail = "anissa.gmail.com";
  const fakeName = "Anissa";

  useEffect(() => {
    (async () => {
      try {
        const url = `/annonces/${id}/students`
        const { data } = await axiosClient.get(url)
        setAnnonces(data);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [id])

  return (
    <SidebarStyled>
      <LogoTitle>
        Best
        <LogoSpan>Student</LogoSpan>
      </LogoTitle>
      <Row>
        <Avatar
          src={me}
          alt='me.jpeg'
          size={90}
        />
      </Row>
      <ListContainer>
        <ListItem>{fakeEmail}</ListItem>
        <ListItem >{fakeName}</ListItem>
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

  `