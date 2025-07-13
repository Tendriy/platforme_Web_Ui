import React from 'react';
import styled from 'styled-components';

function Message() {
  return (
    <Wrapper>
      <ChatContainer>
        <MessageList>
          <MessageBubble left>Bienvenue sur la plateforme fa tsy we bienvenu sur plateforme</MessageBubble>
          <MessageBubble left>Bienvenue sur la plateforme fa tsy we bienvenu sur plateforme</MessageBubble>
          <MessageBubble right>ok</MessageBubble>
          <MessageBubble left>Yes</MessageBubble>
          <MessageBubble right>Encore ?</MessageBubble>
          <MessageBubble left>Tu es sûr ?</MessageBubble>
          <MessageBubble right>Oui oui</MessageBubble>
          <MessageBubble left>Très bien</MessageBubble>
          <MessageBubble right>C'est noté</MessageBubble>
          <MessageBubble left>On continue demain ?</MessageBubble>
          <MessageBubble right>Pas de souci !</MessageBubble>

        </MessageList>

        <InputZone>
          <Input placeholder="Aa" />
          <SendButton>📨</SendButton>
        </InputZone>
      </ChatContainer>
    </Wrapper>
  );
}

export default Message;

const Wrapper = styled.div`
  width: 80vw;
  height: 50vh;
  display: flex;
  justify-content: center;   
  align-items: center;       
  background-color: #f5f5f5;
`;

const ChatContainer = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 10px;
  border: 3px solid #222020;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  font-family: Arial, sans-serif;
  background-color: #fff; /* pour bien voir l’intérieur */
`;



const MessageList = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  width: 100%;

  /* Personnalisation de la scrollbar pour Chrome / Webkit */
  &::-webkit-scrollbar {
    width: 3px; /* largeur de la barre */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* couleur de la barre */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Scrollbar fine pour Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
`;


const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;
  align-self: ${({ left }) => (left ? 'flex-start' : 'flex-end')};
  background-color: ${({ left }) => (left ? '#f0f0f0' : '#007bff;')};
  color: ${({ left }) => (left ? '#000' : '#fff')};
`;

const InputZone = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background: #fff;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 14px;
  padding: 8px;
  outline: none;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 8px;
`;
