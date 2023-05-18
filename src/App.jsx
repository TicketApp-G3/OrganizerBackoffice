import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { useEffect } from 'react'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { AuthProvider } from './contexts/AuthProvider'
import AppRouter from './routers/AppRouter'
import { customTheme } from './themes/customTheme'
import apiProvider from './api/apiProvider'

const App = () => {
  const preferredColorScheme = useColorScheme()

  useEffect(() => {
    apiProvider().health()
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
        <ModalsProvider>
          <Notifications />
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
