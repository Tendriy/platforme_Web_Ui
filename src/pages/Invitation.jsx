import { useState } from "react";
import Modal from "~/components/ui/Modal"

function Invitation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Ouvrir le Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {() => (
          <>
            <h2>Titre du Modal</h2>
            <p>Voici un contenu de modal avec animation !</p>
            <button onClick={() => setIsModalOpen(false)}>Fermer</button>
          </>
        )}
      </Modal>
    </>
  )
}

export default InviteFriends;

const Container = styled.div`
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 12px;
  text-align: center;
  width: 30%;
  max-width: 500px;
  margin: 40px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Para = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  margin-bottom: 20px;
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 6px;

  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 10px;
  }
`;

const FriendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  padding: 12px 16px;
  border-radius: 8px;
`;

const FriendName = styled.span`
  font-weight: 150;
  font-size: 16px;
`;

const InviteButton = styled(Button)`
  background-color: #1877f2;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  width: 70px;
`;

const InvitedText = styled.span`
  color: green;
  font-weight: bold;
`;

const NoResult = styled.p`
  font-style: italic;
  color: #888;
`;

const ScrollButton = styled.button`
  margin-top: 20px;
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0f5ac1;
  }
`;
