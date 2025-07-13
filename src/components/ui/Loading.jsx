import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

function Loading() {
  return (
    <FixedOverlay>
      <DotsWrapper>
        <Dot style={{ animationDelay: '0s' }} />
        <Dot style={{ animationDelay: '0.2s' }} />
        <Dot style={{ animationDelay: '0.4s' }} />
        <Dot style={{ animationDelay: '0.6s' }} />
        <Dot style={{ animationDelay: '0.8s' }} />
      </DotsWrapper>
    </FixedOverlay>
  );
}

const FixedOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #007bff;
  border-radius: 50%;
  opacity: 0.3;
  animation: ${bounce} 1.4s infinite ease-in-out both;
`;

export default Loading;
