import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Reg from './components/Reg.jsx';
import Footer from './components/Footer.jsx';
import Stats from './components/Stats.jsx';
import Services from './components/Services.jsx';
import Newsletter from './components/Newsletter.jsx';
import Subscription from './components/Subscription.jsx';
import CNav from './client/CNav.jsx';

function App() {
  
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<>
        <Navbar />
        <Hero />
        <Stats />
        <Services/> 
        <Subscription />
        <Newsletter />
        <Footer />
        </>} />
        <Route exact path='/registration' element={ <>
        <Navbar />
        <Reg />
        <Footer />
        </> } />
        <Route exact path='/client' element={<>
        <CNav />
        </>} />
        

      </Routes>
    </div>
  )
}

export default App
