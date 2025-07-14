import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MessageSquare } from 'lucide-react';
import TextArea from '~/components/ui/TextArea';
import { exec } from '~/utils/exec';
import axiosClient from '~/config/axiosClient';
import makeFullUrl from '~/utils/makeFullUrl';
import { produce } from 'immer';
import Loading from '~/components/ui/Loading';
import ErrorMessage from '~/components/ui/ErrorMessage';
import EmptyData from '~/components/ui/EmptyData';
import me from '~/assets/images/me.jpeg';
function Home() {
  const [annonces, setAnnonces] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');

  useEffect(() => {
    void exec(
      () => axiosClient.get('/annonces'),
      setLoading,
      setError
    ).then(res => {
      if (res) {
        const formattedAnnonces = res.data.map((annonce) =>
          produce(annonce, (draft) => {
            const auteur = draft.auteur || {};

            draft.date_de_publication = draft.dateDePublication;
            draft.premon = auteur.prenom || 'Anonyme';
            draft.nom = auteur.nom || '';
            draft.etudiant_image = makeFullUrl(auteur.image, auteur.isAuthGoogle);
            draft.image = makeFullUrl(draft.image);

            draft.commentaires = (draft.commentaires || []).map((comment) => ({
              id: comment.id,
              contenu: comment.contenu,
              date: comment.date,
              premon: comment.auteur?.prenom || 'Anonyme',
              etudiant_image: makeFullUrl(comment.auteur?.image, auteur.isAuthGoogle),
            }));
          })
        );
        setAnnonces(formattedAnnonces);
      }
    });
  }, []);

  const toggleComments = (id) => {
    setVisibleComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSendComment = async (annonceId) => {
    const message = commentInputs[annonceId]?.trim();
    if (!message) return;

    try {
      const res = await axiosClient.post('/comments', {
        annonceId,
        contenu: message,
      });

      if (res?.data) {
        setAnnonces(prevAnnonces =>
          prevAnnonces.map(annonce => {
            if (annonce.id === annonceId) {
              return produce(annonce, draft => {
                draft.commentaires.push(res.data); 
              });
            }
            return annonce;
          })
        );
        setCommentInputs(prev => ({ ...prev, [annonceId]: '' }));
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout du commentaire');
    }
  };

  const handleDeleteComment = async (annonceId, commentId) => {
    if (!window.confirm('Supprimer ce commentaire ?')) return;

    try {
      await axiosClient.delete(`/comments/${commentId}`);

      setAnnonces(prevAnnonces =>
        prevAnnonces.map(annonce => {
          if (annonce.id === annonceId) {
            return produce(annonce, draft => {
              draft.commentaires = draft.commentaires.filter(c => c.id !== commentId);
            });
          }
          return annonce;
        })
      );
    } catch (err) {
      setError('Erreur lors de la suppression du commentaire');
    }
  };

  const startEditComment = (commentId, contenu) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(contenu);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  const handleEditCommentSave = async (annonceId, commentId) => {
    const contentTrimmed = editingCommentContent.trim();
    if (!contentTrimmed) return;

    try {
      const res = await axiosClient.put(`/comments/${commentId}`, {
        contenu: contentTrimmed,
      });

      if (res?.data) {
        setAnnonces(prevAnnonces =>
          prevAnnonces.map(annonce => {
            if (annonce.id === annonceId) {
              return produce(annonce, draft => {
                const index = draft.commentaires.findIndex(c => c.id === commentId);
                if (index !== -1) draft.commentaires[index].contenu = contentTrimmed;
              });
            }
            return annonce;
          })
        );
        cancelEditComment();
      }
    } catch (err) {
      console.error('Erreur lors de la modification du commentaire', err);
      setError('Erreur lors de la modification du commentaire');
    }
  };

  return (
    <AnnoncesList>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error || 'Une erreur est survenue.'} />
      ) : (
        <>
          {!annonces || annonces.length === 0 ? (
            <EmptyData message="Aucun annonce trouvée." />
          ) : (
            annonces.map(annonce => (
              <Card key={annonce.id}>
                <FlexRow>
                  <ProfileImg src={annonce.etudiant_image || me} alt="profil" />
                  <div>
                    <StudentName>{annonce.premon} {annonce.nom}</StudentName>
                    <StudentDate>{new Date(annonce.date_de_publication).toLocaleString()}</StudentDate>
                  </div>
                </FlexRow>

                <AnnonceTitle>{annonce.titre}</AnnonceTitle>
                <AnnonceContent>{annonce.contenu}</AnnonceContent>

                {annonce.image && <AnnonceImage src={annonce.image} alt="annonce" />}

                <CommentIconLine>
                  <CommentButton onClick={() => toggleComments(annonce.id)}>
                    <MessageSquare size={18} />
                    <span>{annonce.commentaires.length}</span>
                  </CommentButton>
                </CommentIconLine>

                {visibleComments[annonce.id] && (
                  <CommentsSection>
                    <h3>Commentaires</h3>
                    {annonce.commentaires.length === 0 ? (
                      <StudentDate>Aucun commentaire</StudentDate>
                    ) : (
                      annonce.commentaires.map(comment => (
                        <Comment key={comment.id}>
                          <CommentImg src={comment.etudiant_image || me} alt="profil" />
                          <div style={{ flexGrow: 1 }}>
                            <CommentName>{comment.premon}</CommentName>
                            <CommentDate>{new Date(comment.date).toLocaleString()}</CommentDate>

                            {editingCommentId === comment.id ? (
                              <>
                                <TextArea
                                  value={editingCommentContent}
                                  onChange={e => setEditingCommentContent(e.target.value)}
                                  $width="100%"
                                  $minHeight="60px"
                                  $borderRadius="0.5rem"
                                />
                                <div style={{ marginTop: 6 }}>
                                  <SubmitButton onClick={() => handleEditCommentSave(annonce.id, comment.id)}>Enregistrer</SubmitButton>
                                  <SubmitButton style={{ marginLeft: 8, backgroundColor: '#9ca3af' }} onClick={cancelEditComment}>Annuler</SubmitButton>
                                </div>
                              </>
                            ) : (
                              <>
                                <CommentText>{comment.contenu}</CommentText>
                                <div style={{ marginTop: 4 }}>
                                  <SubmitButton
                                    style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem', marginRight: 6, backgroundColor: '#2563eb' }}
                                    onClick={() => startEditComment(comment.id, comment.contenu)}
                                  >
                                    Modifier
                                  </SubmitButton>
                                  <SubmitButton
                                    style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem', backgroundColor: '#dc2626' }}
                                    onClick={() => handleDeleteComment(annonce.id, comment.id)}
                                  >
                                    Supprimer
                                  </SubmitButton>
                                </div>
                              </>
                            )}
                          </div>
                        </Comment>
                      ))
                    )}

                    <TextAreaWrapper>
                      <TextArea
                        placeholder="Écrire un commentaire..."
                        value={commentInputs[annonce.id] || ''}
                        onChange={e =>
                          setCommentInputs(prev => ({
                            ...prev,
                            [annonce.id]: e.target.value,
                          }))
                        }
                        $width="100%"
                        $minHeight="80px"
                        $borderRadius="0.5rem"
                      />
                      <SubmitButton onClick={() => handleSendComment(annonce.id)}>
                        Envoyer
                      </SubmitButton>
                    </TextAreaWrapper>
                  </CommentsSection>
                )}
              </Card>
            ))
          )}
        </>
      )}
    </AnnoncesList>
  );
}

export default Home;


const AnnoncesList = styled.div`
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

const TextAreaWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e40af;
  }
`;
