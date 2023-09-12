import CartPage from './components/CartPage/CartPage'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/cart' element={<CartPage />} />
        {/* <Route path='/confirmation' element={} /> */}
      </Routes>
    </div>
  )
}

export default App
