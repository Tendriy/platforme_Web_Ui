import React from 'react'
import styled from 'styled-components'

function Input(props) {
  return (
    <StyledInput
      {...props}
    />
  )
}

const StyledInput = styled.input`
    padding: 10px;
    width: 280px;
    font-size: 14px;
`
export default Input
