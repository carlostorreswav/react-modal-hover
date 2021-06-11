import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
.ModalHoverChild > * {
    visibility: visible;
  }
  
  @keyframes AniOpaOpen {
    0% {
      filter: opacity(0);
    }
    100% {
      filter: opacity(1);
    }
  }
  
  @keyframes AniOpaClose {
    0% {
      filter: opacity(0.5);
    }
    100% {
      filter: opacity(0);
    }
  }
  
`;
 
export default GlobalStyle;