import styled from 'styled-components'

function Button(props) {
  return (
    <StyledButton 
     {... props}
    />
  )
}

const StyledButton = styled.button`
    padding: 12px;
    width: 275px;
    font-size: 16px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 17px;
    &:hover {
        opacity: 0.9;
    }
`
export default Button
