import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MessageSquare } from 'lucide-react';
import { Wrapper } from '~/styles/style';

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
  // état pour garder la visibilité des commentaires par annonce
  const [visibleComments, setVisibleComments] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setAnnonces(allAnnonces);
    }, 300);
  }, []);

  // Toggle affichage commentaires d'une annonce
  const toggleComments = (id) => {
    setVisibleComments((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Wrapper $width="80rem" $height="30rem">
      <PageTitle>Fil d'actualité</PageTitle>

      <AnnoncesList>
        {annonces.map((annonce) => (
          <Card key={annonce.id}>
            <FlexRow>
              <ProfileImg src={annonce.etudiant_image || '/default.jpg'} alt="profil" />
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

            {/* Bouton avec icône commentaire et nombre */}
            <CommentIconLine>
              <CommentButton onClick={() => toggleComments(annonce.id)}>
                <MessageSquare size={18} />
                <span>{annonce.commentaires.length}</span>
              </CommentButton>
            </CommentIconLine>

            {/* Section commentaires visible selon état */}
            {visibleComments[annonce.id] && (
              <CommentsSection>
                <h3>Commentaires</h3>
                {annonce.commentaires.length === 0 ? (
                  <StudentDate>Aucun commentaire</StudentDate>
                ) : (
                  annonce.commentaires.map((comment) => (
                    <Comment key={comment.id}>
                      <CommentImg src={comment.etudiant_image || '/default.jpg'} alt="profil" />
                      <div>
                        <CommentName>{comment.premon}</CommentName>
                        <CommentDate>{new Date(comment.date).toLocaleString()}</CommentDate>
                        <CommentText>{comment.contenu}</CommentText>
                      </div>
                    </Comment>
                  ))
                )}
              </CommentsSection>
            )}
          </Card>
        ))}
      </AnnoncesList>
    </Wrapper>
  );
}

export default Home;


const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const AnnoncesList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 8px;

  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.5) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.5);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
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

const CommentIconLine = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #1877f2;
  }

  svg {
    color: #1877f2;
  }

  span {
    font-weight: 500;
  }
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
