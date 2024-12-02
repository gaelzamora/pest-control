import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/auth'

function App() {

  const {isAuth} = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={isAuth ? <HomePage /> : <LoginPage />} />
        <Route index path='register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App