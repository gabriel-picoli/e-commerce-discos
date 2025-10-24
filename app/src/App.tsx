import { ThemeProvider } from 'styled-components'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import theme from './styles/theme'
import GlobalStyle from './styles/GlobalStyle'

import queryClient from './services/queryClient'

import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <AppRoutes />

          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: {
                fontSize: 32
              }
            }}
            expand
            visibleToasts={3}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
