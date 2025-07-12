import React from 'react';
import styled from 'styled-components';

/**
 * @param {Object} props
 * @param {string} props.src 
 * @param {string} [props.alt] 
 * @param {number} [props.size]
 */
function Avatar({ src, alt = 'User avatar', size = 60 }) {
  return <StyledAvatar src={src} alt={alt} $size={size} />;
}

export default Avatar;

const StyledAvatar = styled.img`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;
