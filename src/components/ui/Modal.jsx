import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, css } from 'styled-components';
import { X } from 'lucide-react';
import darkenColor from '~/utils/darkenColor';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const scaleOut = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.8); opacity: 0; }
`;

function Modal({
  isOpen,
  onClose,
  children,
  width = '600px',
  height = 'auto',
  backgroundColor = 'white',
  borderRadius = '8px',
  padding = '1.5rem',
  boxShadow = '0 4px 20px rgba(0,0,0,0.2)',
  outline = 'none',
  closeButtonColor = '#333',
  overlayBackground = 'rgba(0,0,0,0.5)',
  zIndex = 1000,
}) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeoutId = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  if (!visible) return null;

  return createPortal(
    <Overlay
      animateIn={isOpen}
      onClick={onClose}
      background={overlayBackground}
      style={{ zIndex }}
    >
      <ModalContainer
        animateIn={isOpen}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        padding={padding}
        boxShadow={boxShadow}
        outline={outline}
      >
        <CloseButton onClick={onClose} aria-label="Close modal" color={closeButtonColor}>
          <X size={24} />
        </CloseButton>
        {children()}
      </ModalContainer>
    </Overlay>,
    document.body
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ background }) => background};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ animateIn }) => (animateIn ? fadeIn : fadeOut)} 300ms forwards;
`;

const ModalContainer = styled.div`
  position: relative;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${({ padding }) => padding};
  max-width: ${({ width }) => width};
  width: 90%;
  height: ${({ height }) => height};
  box-shadow: ${({ boxShadow }) => boxShadow};
  outline: ${({ outline }) => outline};
  animation: ${({ animateIn }) => (animateIn ? scaleIn : scaleOut)} 300ms forwards;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ color }) => color};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ color }) => darkenColor(color, 0.2)};
  }
`;



export default Modal;
