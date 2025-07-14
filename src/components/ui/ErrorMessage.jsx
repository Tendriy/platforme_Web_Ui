import React from 'react';
import styled from 'styled-components';


function ErrorMessage({ message }) {
  if (!message) return null; 

  return <ErrorMessageStyled>{message}</ErrorMessageStyled>;
}


const ErrorMessageStyled = styled.p`
  text-align: center;
  color: red;
  font-weight: 600;
  background-color: #ffe4e4;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export default ErrorMessage;
