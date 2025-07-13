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

export default Invitation