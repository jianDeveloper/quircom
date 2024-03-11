import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Reg from './components/Reg.jsx';
import Footer from './components/Footer.jsx';
import Stats from './components/Stats.jsx';
import Newsletter from './components/Newsletter.jsx';
import Subscription from './components/Subscription.jsx';
import CDashboard  from './client/CDashboard.jsx';
import CUser from './client/CUser.jsx';
import CMarketplace from './client/CMarketplace.jsx';
import CSettings from './client/CSettings.jsx';
import CTracker from './client/CTracker.jsx';

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
        <Route exact path='/client/dashboard' element={<>
        <CDashboard />
        </>} />
        <Route exact path='/client/profile' element={<>
        <CUser />
        </>} />
        <Route exact path='/client/browse-service' element={<>
        <CMarketplace />
        </>} />
        <Route exact path='/client/settings' element={<>
        <CSettings />
        </>} />
        <Route exact path='/client/tracker' element={<>
        <CTracker />
        </>} />
        

      </Routes>
    </div>
  )
}

export default App
