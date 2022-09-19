import { AuthContextProvider } from './contexts/AuthContext'

import AppRoutes from './routes'

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </>
  )
}

export default App
