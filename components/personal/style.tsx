import styled from "styled-components"


interface StyledProps {
    width?: number;
    height?: number;
    background?:string;
    transform?:string;    
 }



export const StyledDiv = styled.div<StyledProps>`

  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  background-color:${props => `${props.background}`};
  transform:${props=> `${props.transform}`};
`;
