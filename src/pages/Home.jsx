import { useEffect, useState } from 'react';
import styled from 'styled-components';

const allAnnonces = [
  {
    id: 1,
    titre: "Nouvel événement à venir !",
    contenu: "Rejoignez-nous pour une soirée de networking avec des professionnels du secteur.",
    image: "/images/me.jpeg",
    date_de_publication: "2025-07-11T18:30:00Z",
    premon: "Sitraka",
    nom: "Randriamalala",
    etudiant_image: "/images/bg-auth.jpg",
    commentaires: [
      {
        id: 101,
        premon: "Lova",
        etudiant_image: "/images/me.jpeg",
        date: "2025-07-12T10:00:00Z",
        contenu: "Super hâte d'y être !"
      },
      {
        id: 102,
        premon: "Miora",
        etudiant_image: "/images/school.jpeg",
        date: "2025-07-12T14:30:00Z",
        contenu: "Très bonne initiative, bravo à l'équipe !"
      }
    ]
  },
  {
    id: 2,
    titre: "Annonce importante",
    contenu: "Les inscriptions pour le concours de programmation sont ouvertes jusqu'au 20 juillet.",
    image: "/images/me.jpeg",
    date_de_publication: "2025-07-10T12:00:00Z",
    premon: "Tojo",
    nom: "Rakotoarisoa",
    etudiant_image: "/images/bg-auth.jpg",
    commentaires: []
  }
];

function Home() {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAnnonces(allAnnonces);
    }, 300);
  }, []);

  return (
    <PageContainer>
      <PageTitle>Fil d'actualité</PageTitle>

      {annonces.map((annonce) => (
        <Card key={annonce.id}>
          <FlexRow>
            <ProfileImg
              src={annonce.etudiant_image || '/default.jpg'}
              alt="profil"
            />
            <div>
              <StudentName>{annonce.premon} {annonce.nom}</StudentName>
              <StudentDate>{new Date(annonce.date_de_publication).toLocaleString()}</StudentDate>
            </div>
          </FlexRow>

          <AnnonceTitle>{annonce.titre}</AnnonceTitle>
          <AnnonceContent>{annonce.contenu}</AnnonceContent>

          {annonce.image && (
            <AnnonceImage src={annonce.image} alt="annonce" />
          )}

          <CommentsSection>
            <h3>Commentaires</h3>
            {annonce.commentaires.length === 0 && (
              <StudentDate>Aucun commentaire</StudentDate>
            )}
            {annonce.commentaires.map((comment) => (
              <Comment key={comment.id}>
                <CommentImg
                  src={comment.etudiant_image || '/default.jpg'}
                  alt="profil"
                />
                <div>
                  <CommentName>{comment.premon}</CommentName>
                  <CommentDate>{new Date(comment.date).toLocaleString()}</CommentDate>
                  <CommentText>{comment.contenu}</CommentText>
                </div>
              </Comment>
            ))}
          </CommentsSection>
        </Card>
      ))}
    </PageContainer>
  );
}

export default Home;
const PageContainer = styled.div`
  background-color: #f3f4f6;
  min-height: 100vh;
  padding: 1.5rem;
  font-family: sans-serif;
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  margin-right: 1rem;
  object-fit: cover;
`;

const StudentName = styled.p`
  font-weight: 600;
`;

const StudentDate = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const AnnonceTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const AnnonceContent = styled.p`
  margin-top: 0.5rem;
`;

const AnnonceImage = styled.img`
  margin-top: 1rem;
  max-height: 24rem;
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const CommentsSection = styled.div`
  margin-top: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.5rem;
`;

const Comment = styled.div`
  display: flex;
  align-items: start;
  margin-top: 0.75rem;
`;

const CommentImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  margin-right: 0.5rem;
  object-fit: cover;
`;

const CommentName = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
`;

const CommentDate = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;

const CommentText = styled.p`
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
