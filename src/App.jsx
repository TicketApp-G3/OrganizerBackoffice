import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthProvider'
import AppRouter from './routers/AppRouter'
import { customTheme } from './themes/customTheme'
import apiProvider from './api/bffService'

const App = () => {
  const preferredColorScheme = useColorScheme()

  useEffect(() => {
    if (import.meta.env.VITE_ENV === 'local') apiProvider().health()
  }, [])

  const [colorScheme, setColorScheme] = useLocalStorage(preferredColorScheme)

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme, ...customTheme }}
      >
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
