import { useEffect, useState } from 'react';
import '~/assets/styles/HomePage.css';


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
    <div className="page-container">
      <h1 className="page-title">Fil d'actualité</h1>

      {annonces.map((annonce) => (
        <div key={annonce.id} className="card">
          <div className="flex-row">
            <img
              src={annonce.etudiant_image || '/default.jpg'}
              alt="profil"
              className="profile-img"
            />
            <div>
              <p className="student-name">{annonce.premon} {annonce.nom}</p>
              <p className="student-date">{new Date(annonce.date_de_publication).toLocaleString()}</p>
            </div>
          </div>

          <h2 className="annonce-title">{annonce.titre}</h2>
          <p className="annonce-content">{annonce.contenu}</p>

          {annonce.image && (
            <img
              src={annonce.image}
              alt="annonce"
              className="annonce-image"
            />
          )}

          <div className="comments-section">
            <h3>Commentaires</h3>
            {annonce.commentaires.length === 0 && (
              <p className="student-date">Aucun commentaire</p>
            )}
            {annonce.commentaires.map((comment) => (
              <div key={comment.id} className="comment">
                <img
                  src={comment.etudiant_image || '/default.jpg'}
                  alt="profil"
                  className="comment-img"
                />
                <div>
                  <p className="comment-name">{comment.premon}</p>
                  <p className="comment-date">{new Date(comment.date).toLocaleString()}</p>
                  <p className="comment-text">{comment.contenu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
