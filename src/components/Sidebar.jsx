import Avatar from '~/components/Avatar';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import me from '~/assets/images/me.jpeg'
import useAuth from '~/hooks/useAuth';
import makeFullUrl from '~/utils/makeFullUrl';
import { exec } from '~/utils/exec';
import axiosClient from '~/config/axiosClient';
import Button from '~/components/ui/Button';
import Loading from '~/components/ui/Loading';
import Modal from '~/components/ui/Modal';
import AnnonceForm from '~/components/annonces/AnnonceForm';

function Sidebar() {
  const [annonces, setAnnonces] = useState([])
  const [totalAnnonces, setTotalAnnonces] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useAuth(state => state.user)
  const [isCreatedAnnonce, setIsCreatedAnnonce] = useState(false)

  const userInfo = useMemo(() => {
    return {
      image: makeFullUrl(user?.image, user?.isAuthGoogle),
      email: user?.email.toLowerCase() || '',
      nom: user?.nom.toLowerCase() || '',
      prenom: user?.prenom.toLowerCase() || ''
    };
  }, [user]);

  useEffect(() => {
    void exec(
      () => axiosClient.get('/annonces/etudiant'),
      setLoading,
      setError
    ).then(res => {
      if (res) setAnnonces(res.data);
    });

    void exec(
      () => axiosClient.get('/annonces/etudiant/total'),
      setLoading,
      setError
    ).then(res => {
      if (res) setTotalAnnonces(res.data.total);
    });

  }, [])

  return (
    <>
      <SidebarStyled>
        <LogoTitle>
          Best
          <LogoSpan>Student</LogoSpan>
        </LogoTitle>
        <Row>
          {!!user?.image ? (
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

        <Button onClick={() => setIsCreatedAnnonce(true)} $bgColor="#007bff" style={{ marginBottom: '1rem' }}>
          Créer une annonce
        </Button>

        {loading ? (
          <Loading />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : annonces.length === 0 ? (
          <EmptyMessage>Aucune annonce disponible.</EmptyMessage>
        ) : (
          <>
            <TotalAnnoncesText>
              <strong>Total {totalAnnonces === 1 ? 'annonce' : 'annonces'} :</strong> {totalAnnonces}
            </TotalAnnoncesText>

            <AnnonceList>
              {annonces.map(({ id, titre, contenu, dateDePublication }) => (
                <AnnonceItem key={id}>
                  <AnnonceTitle>{titre}</AnnonceTitle>
                  <AnnonceContent>{contenu || 'Pas de description'}</AnnonceContent>
                  <AnnonceDate>{new Date(dateDePublication).toLocaleDateString()}</AnnonceDate>
                </AnnonceItem>
              ))}
            </AnnonceList>
          </>
        )}
      </SidebarStyled>

      <Modal isOpen={isCreatedAnnonce} onClose={() => setIsCreatedAnnonce(false)}>
        {() => (
          <>
            <AnnonceForm
              onSuccess={(newAnnonce) => {
                setAnnonces(prev => [newAnnonce, ...prev]);
                setTotalAnnonces(prev => prev + 1);
                setIsCreatedAnnonce(false);
              }}
              onCancel={() => setIsCreatedAnnonce(false)}
            />
          </>
        )}

      </Modal>
    </>
  )
}
export default Sidebar

const SidebarStyled = styled.aside`
  width: 20rem;
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
const TotalAnnoncesText = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 1rem 0;

  strong {
    color: #007bff;
    font-weight: bold;
  }
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

const AnnonceList = styled.div`
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
`

const AnnonceItem = styled.div`
  background: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
`

const AnnonceTitle = styled.h3`
  margin: 0;
  font-weight: bold;
  font-size: 1.1rem;
`

const AnnonceContent = styled.p`
  margin: 0.2rem 0 0.4rem;
  font-size: 0.9rem;
  color: #555;
`

const AnnonceDate = styled.span`
  font-size: 0.8rem;
  color: #999;
`

const EmptyMessage = styled.p`
  text-align: center;
  color: #888;
  font-style: italic;
  margin-top: 1.5rem;
  font-size: 1rem;
`;