import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axiosClient from "~/config/axiosClient";
import useAuth from "~/hooks/useAuth";
import { exec } from "~/utils/exec";
import { MessageSquare, Send } from "lucide-react";
import io from "socket.io-client";

function Invitation() {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("DISPONIBLES");
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);
  const socketRef = useRef(null);
  const currentRoomRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io(import.meta.env.VITE_API_URL || "http://localhost:3000", {
      auth: { token },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connecté avec ID:", socketRef.current.id);
    });

    socketRef.current.on("receive_message", (msg) => {
      if (msg.roomId === currentRoomRef.current) {
        setChatMessages((prev) => [...prev, msg]);
      }
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Erreur connexion socket:", err.message);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
      currentRoomRef.current = null;
    };
  }, [token]);

  // Charger les étudiants selon onglet
  useEffect(() => {
    const urls = {
      DISPONIBLES: "/etudiants/disponibles",
      RECUES: "/friends/invitations-recues",
      ENVOYEES: "/friends/invitations-envoyees",
      AMIS: "/friends/amis",
    };

    void exec(() => axiosClient.get(urls[tab]), setLoading, setError).then((res) => {
      if (!res) return;
      setEtudiants(res.data.map((et) => ({ ...et, pending: false })));
    });
  }, [tab]);

  const updateEtudiant = (id, newStatut) => {
    setEtudiants((prev) =>
      prev.map((et) => (et.id === id ? { ...et, statutAmitie: newStatut, pending: false } : et))
    );
  };

  const handleAction = async (etudiantId, action) => {
    setEtudiants((prev) =>
      prev.map((et) => (et.id === etudiantId ? { ...et, pending: true } : et))
    );

    const endpoint = {
      inviter: "/friends/inviter",
      accepter: "/friends/accepter",
      refuser: "/friends/refuser",
    }[action];

    const body = action === "inviter" ? { receveurId: etudiantId } : { demandeurId: etudiantId };

    const res = await exec(() => axiosClient.post(endpoint, body), () => {}, setError);

    if (res) updateEtudiant(etudiantId, res.statut);
  };

  const openChat = (etudiant) => {
    setSelectedChat(etudiant);
    setChatVisible(true);
    setChatMessages([]);

    const roomId = [user.id, etudiant.id].sort().join("-");
    currentRoomRef.current = roomId;

    socketRef.current?.emit("join_room", { etudiant1Id: user.id, etudiant2Id: etudiant.id });
  };

  // Envoyer message
  const sendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const roomId = [user.id, selectedChat.id].sort().join("-");

    socketRef.current?.emit("send_message", {
      senderId: user.id,
      receiverId: selectedChat.id,
      content: messageInput,
      roomId,
    });

    setMessageInput("");
  };

  return (
    <Container>
      <Title>Gestion des Invitations</Title>

      <Tabs>
        {["DISPONIBLES", "RECUES", "ENVOYEES", "AMIS"].map((key) => (
          <TabButton key={key} $active={tab === key} onClick={() => setTab(key)}>
            {{
              DISPONIBLES: "Étudiants à inviter",
              RECUES: "Invitations reçues",
              ENVOYEES: "Invitations envoyées",
              AMIS: "Mes amis",
            }[key]}
          </TabButton>
        ))}
      </Tabs>

      {loading && <MessageChargement>Chargement...</MessageChargement>}
      {error && <MessageErreur>{error}</MessageErreur>}

      <EtudiantList>
        {etudiants.map((etudiant) => (
          <EtudiantItem key={etudiant.id}>
            <Info>
              <Nom>
                {etudiant.prenom} {etudiant.nom}
              </Nom>
              <Email>{etudiant.email}</Email>
            </Info>
            <Actions>
              {tab === "DISPONIBLES" && (
                <Bouton disabled={etudiant.pending} onClick={() => handleAction(etudiant.id, "inviter")}>
                  {etudiant.pending ? "..." : "Inviter"}
                </Bouton>
              )}
              {tab === "RECUES" && (
                <>
                  <Bouton disabled={etudiant.pending} onClick={() => handleAction(etudiant.id, "accepter")}>
                    {etudiant.pending ? "..." : "Accepter"}
                  </Bouton>
                  <Bouton disabled={etudiant.pending} danger onClick={() => handleAction(etudiant.id, "refuser")}>
                    {etudiant.pending ? "..." : "Refuser"}
                  </Bouton>
                </>
              )}
              {tab === "ENVOYEES" && <StatusText>Invitation envoyée</StatusText>}
              {tab === "AMIS" && (
                <>
                  <StatusText>Ami(e)</StatusText>
                  <ChatIcon
                    aria-label={`Discuter avec ${etudiant.prenom}`}
                    title={`Discuter avec ${etudiant.prenom}`}
                    onClick={() => openChat(etudiant)}
                  >
                    <MessageSquare size={20} />
                  </ChatIcon>
                </>
              )}
            </Actions>
          </EtudiantItem>
        ))}
      </EtudiantList>

      {chatVisible && selectedChat && (
        <ChatBox>
          <ChatHeader>
            {selectedChat.prenom} {selectedChat.nom}
          </ChatHeader>
          <Messages>
            {chatMessages.map((msg, i) => (
              <Message key={i}>{msg.content}</Message>
            ))}
          </Messages>
          <InputArea>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Écrire un message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <SendButton onClick={sendMessage} aria-label="Envoyer message">
              <Send size={18} />
            </SendButton>
          </InputArea>
        </ChatBox>
      )}
    </Container>
  );
}

export default Invitation;

/* === Styled Components ===
  (Reste inchangé, tu peux reprendre ceux que tu avais)
*/


const Container = styled.div`
  max-width: 700px;
  margin: 30px auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #222;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const TabButton = styled.button`
  background-color: ${({ $active }) => ($active ? "#007bff" : "#f0f0f0")};
  color: ${({ $active }) => ($active ? "#fff" : "#444")};
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#0056b3" : "#dcdcdc")};
  }
`;

const MessageChargement = styled.p`
  text-align: center;
  color: #555;
  font-style: italic;
`;

const MessageErreur = styled.p`
  text-align: center;
  color: #d32f2f;
  font-weight: 700;
`;

const EtudiantList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EtudiantItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;

  &:hover {
    background: #f9f9f9;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Nom = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #222;
`;

const Email = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 2px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ChatIcon = styled.button`
  background: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
  }
`;

const Bouton = styled.button`
  padding: 7px 14px;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ danger }) => (danger ? "#e53935" : "#007bff")};
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ danger }) => (danger ? "#b71c1c" : "#0056b3")};
  }
`;

const StatusText = styled.span`
  color: #555;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ChatBox = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 320px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
`;

const ChatHeader = styled.div`
  background: #007bff;
  color: white;
  padding: 14px 16px;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
`;

const Messages = styled.div`
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  max-height: 220px;
  background: #f9f9f9;
`;

const Message = styled.div`
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #333;
  background: #e0e7ff;
  padding: 6px 10px;
  border-radius: 6px;
  max-width: 80%;
`;

const InputArea = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px 14px;
    font-size: 1rem;
  }
`;

const SendButton = styled.button`
  background: #007bff;
  border: none;
  color: white;
  padding: 0 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  font-weight: 700;

  &:hover {
    background: #0056b3;
  }
`;

