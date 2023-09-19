import CartPage from './components/CartPage/CartPage'
import ConfirmationPage from './components/ConfirmationPage/ConfirmationPage'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { Route, Routes, Navigate } from "react-router-dom"
import ProfilePage from './components/ProfilePage/ProfilePage'
import { useUserContext } from './context/UserContext'

function App() {

  const { user } = useUserContext()
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/cart' element={<CartPage />} />
        {user ? (
        <>
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/confirmation' element={<ConfirmationPage />} />
        </>
        ) : (
          <Route path='*' element={<Main />} />
        )}
      </Routes>
    </div>
  )
}

export default App
