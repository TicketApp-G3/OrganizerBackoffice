import { AuthProvider } from './contexts/AuthProvider'
import AppRouter from './routers/AppRouter'

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
