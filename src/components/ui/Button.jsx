import styled from 'styled-components'

function Button(props) {
  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  padding: ${({ $padding }) => $padding || '12px'};
  width: ${({ $width }) => $width || '275px'};
  font-size: ${({ $fontSize }) => $fontSize || '16px'};
  background-color: ${({ $bgColor }) => $bgColor || '#000'};
  color: ${({ $color }) => $color || '#fff'};
  border: ${({ $border }) => $border || 'none'};
  cursor: pointer;
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};

  outline: ${({ $outline }) => $outline || 'none'};

  &:hover {
    opacity: ${({ $hoverOpacity }) => $hoverOpacity || 0.9};
  }
`

export default Button;
