import React from 'react'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Reg from './components/Reg.jsx';

function App() {
  const [isLogin, setUserNavbar] = useState(false);
  return (
    <div>
      {isLogin ? <UserNavbar /> : <Navbar />}
      <Routes>
        <Route exact path='/' element={<Hero />} />
        <Route exact path='/registration' element={<Reg />} />
        {/* onLogin={() => setUserNavbar(true)} */}

      </Routes>
    </div>
  )
}

export default App
