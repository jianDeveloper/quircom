import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Reg from './components/Reg.jsx';
import CNav from './Client/CNav.jsx';
import Footer from './components/Footer.jsx';
import Stats from './components/Stats.jsx';
import Newsletter from './components/Newsletter.jsx';
import Subscription from './components/Subscription.jsx';
import Services from './components/Services.jsx'
import Marketplace from './components/Marketplace.jsx';


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
        </> } />
        <Route exact path='/client-dashboard' element={<>
        <CNav />
        </>} />
        <Route exact path='/marketplace' element={<>
        <Marketplace />
        </>} />

      </Routes>
    </div>
  )
}

export default App
