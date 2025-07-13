import React from 'react'
import styled from 'styled-components'

function TextArea(props) {
  return (
    <StyledTextArea {...props} />
  )
}

const StyledTextArea = styled.textarea`
  padding: ${({ $padding }) => $padding || '10px'};
  width: ${({ $width }) => $width || '280px'};
  font-size: ${({ $fontSize }) => $fontSize || '14px'};
  color: ${({ $color }) => $color || 'inherit'};
  border: ${({ $border }) => $border || '1px solid #ccc'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
  outline: ${({ $outline }) => $outline || 'none'};
  resize: ${({ $resize }) => $resize || 'vertical'};
  min-height: ${({ $minHeight }) => $minHeight || '100px'};

  &:focus {
    outline: ${({ $focusOutline }) => $focusOutline || '2px solid #007bff'};
  }
`

export default TextArea
