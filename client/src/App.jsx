import React from 'react'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Authpage from './pages/auth'

function App() {
  return (
   <Routes>
    <Route path='/auth' element={<Authpage/>}/>
   </Routes>
  )
}

export default App