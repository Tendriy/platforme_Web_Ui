import React from 'react'
import styled from 'styled-components'

function Input(props) {
  return (
    <StyledInput {...props} />
  )
}

const StyledInput = styled.input`
  padding: ${({ $padding }) => $padding || '10px'};
  width: ${({ $width }) => $width || '280px'};
  font-size: ${({ $fontSize }) => $fontSize || '14px'};
  color: ${({ $color }) => $color || 'inherit'};
  border: ${({ $border }) => $border || '1px solid #ccc'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
  outline: ${({ $outline }) => $outline || 'none'};

  &:focus {
    outline: ${({ $focusOutline }) => $focusOutline || '2px solid #007bff'};
  }
`

export default Input
