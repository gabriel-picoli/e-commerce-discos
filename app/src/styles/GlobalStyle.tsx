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

`

export default GlobalStyle
