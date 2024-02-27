import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Reg from './components/Reg.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Hero />} />
        <Route exact path='/registration' element={<Reg />} />
      </Routes>
    </div>
  )
}

export default App
