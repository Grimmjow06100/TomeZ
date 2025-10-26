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




export const Slogan = styled.p `
  font-family: var(--font-jacques);

`


export const LogoTitle = styled.h1<{size:number}> `
  font-family: var(--font-jacques);
  font-size:${props => `${props.size}px`};
`


export const MangaName = styled.h1 `
  font-family: var(--font-jacques);
  font-size:50px;
`
