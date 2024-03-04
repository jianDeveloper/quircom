import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Reg from './components/Reg.jsx';
import CNav from './Client/CNav.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<>
        <Navbar />
        <Hero />
        </>} />
        <Route exact path='/registration' element={ <>
        <Navbar />
        <Reg />
        </> } />
        <Route exact path='/client-dashboard' element={<>
        <CNav />
        </>} />

      </Routes>
    </div>
  )
}

export default App
