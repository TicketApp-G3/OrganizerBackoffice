import { ColorSchemeProvider, MantineProvider, Text } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import dotenv from 'dotenv'
import { AuthProvider } from './contexts/AuthProvider'
import AppRouter from './routers/AppRouter'
import { customTheme } from './themes/customTheme'

const App = () => {
  dotenv.config()
  const preferredColorScheme = useColorScheme()

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
          <Text>{import.meta.env.VITE_COMMIT_REF}</Text>
          <AppRouter />
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
