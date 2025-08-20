import { ThemeProvider } from 'styled-components'
import { QueryClientProvider } from '@tanstack/react-query'

import theme from './styles/theme'
import GlobalStyle from './styles/GlobalStyle'

import queryClient from './services/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <div>maconha</div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
