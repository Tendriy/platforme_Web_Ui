import styled from 'styled-components'
import bg from '~/assets/images/bg-auth.jpg'

export const Wrapper = styled.div`
  margin: 0;
  font-family: Arial, sans-serif;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.$height ?  props.$height : "100vh"};
  background-color: rebeccapurple;
  width: ${(props) => props.$width ?  props.$width : "100vw"};
`
