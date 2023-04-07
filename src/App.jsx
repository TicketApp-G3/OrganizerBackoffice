import { ColorSchemeProvider, MantineProvider, Text } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { AuthProvider } from './contexts/AuthProvider'
import AppRouter from './routers/AppRouter'
import { customTheme } from './themes/customTheme'

const App = () => {
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
          <AppRouter />
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
