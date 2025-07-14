import React from 'react';
import styled from 'styled-components';

function EmptyData({ message = "Aucune donnée disponible." }) {
  return <EmptyDataStyled>{message}</EmptyDataStyled>;
}


const EmptyDataStyled = styled.div`
  text-align: center;
  color: #555;
  font-weight: 500;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  font-size: 1rem;
`;


export default EmptyData;
