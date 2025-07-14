import { produce } from "immer";
import { useEffect, useState } from "react";
import axiosClient from "~/config/axiosClient";
import useAuth from "~/hooks/useAuth";
import { exec } from "~/utils/exec";

function Invitation() {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = useAuth(state => state.user.id)

  useEffect(() => {
    void exec(() => axiosClient.get("/etudiants"), setLoading, setError)
    .then(
      (res) => {
        if (!res) return;
        setEtudiants(
          res.data.map((etudiant) =>
            produce(etudiant, (draft) => {
              draft.pending = false;
            })
          )
        );
      }
    );
  }, []);

  const updateEtudiant = (id, newStatut) => {
    setEtudiants((prev) =>
      prev.map((et) =>
        et.id === id
          ? produce(et, (draft) => {
            draft.statutAmitie = newStatut;
            draft.pending = false;
          })
          : et
      )
    );
  };

  const handleAction = async (etudiantId, action) => {
    setEtudiants((prev) =>
      prev.map((et) =>
        et.id === etudiantId
          ? produce(et, (draft) => {
            draft.pending = true;
          })
          : et
      )
    );

    const endpoint = {
      inviter: "/friends/inviter",
      accepter: "/friends/accepter",
      refuser: "/friends/refuser",
    }[action];

    const res = await exec(
      () =>
        axiosClient.post(endpoint, {
          receveurId: etudiantId,
        }),
      () => { },
      setError
    );

    if (res) {
      updateEtudiant(etudiantId, res.statut);
    }
  };

  return (
    <div>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {etudiants.map((etudiant) => (
          <li key={etudiant.id} style={{ marginBottom: "1rem" }}>
            <strong>
              {etudiant.prenom} {etudiant.nom}
            </strong>{" "}
            - {etudiant.email}
            <div>
              {etudiant.statutAmitie === "NON_AMI" && (
                <button
                  disabled={etudiant.pending}
                  onClick={() => handleAction(etudiant.id, "inviter")}
                >
                  {etudiant.pending ? "..." : "Inviter"}
                </button>
              )}
              {etudiant.statutAmitie === "EN_ATTENTE" && (
                <>
                  <button
                    disabled={etudiant.pending}
                    onClick={() => handleAction(etudiant.id, "accepter")}
                  >
                    {etudiant.pending ? "..." : "Accepter"}
                  </button>
                  <button
                    disabled={etudiant.pending}
                    onClick={() => handleAction(etudiant.id, "refuser")}
                  >
                    {etudiant.pending ? "..." : "Refuser"}
                  </button>
                </>
              )}
              {etudiant.statutAmitie === "ACCEPTEE" && (
                <span style={{ color: "green" }}>✔ Ami</span>
              )}
              {etudiant.statutAmitie === "REFUSEE" && (
                <span style={{ color: "gray" }}>Refusé</span>
              )}
              {etudiant.statutAmitie === "EN_ATTENTE_DE_LUI" && (
                <span style={{ color: "orange" }}>En attente</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Invitation;
