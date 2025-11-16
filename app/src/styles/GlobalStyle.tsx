import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;

     font-family: 'Poppins', sans-serif;
     font-size: 62.5%;
   }

   // resolve bug de aparecer cursor pointer em div de overlay 
   div {
      cursor: default;
   }

   // seta tamanho de fonte para option de selects
   option{
      font-size: 1.6rem;
   }

`

export default GlobalStyle
