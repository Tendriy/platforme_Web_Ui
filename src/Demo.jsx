import styled from "styled-components"

function Demo() {
  return (
    <>
    <Button>  click me</Button>,
    <Button $primary>click on </Button>
    </>
  )
}

const Button = styled.button`

background: ${props => props.$primary ? "#BF4F74" : "white"};
color: ${props => props.$primary ? "white" : "#522d39"};

 padding: 20px;
 background-color: #d1cccc;
 margin:25px;


    
`;


export default Demo
