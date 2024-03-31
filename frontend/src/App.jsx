import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Trial from './components/sample.jsx';
import Reg from './components/Reg.jsx';
import Footer from './components/Footer.jsx';
import Stats from './components/Stats.jsx';
import Services from './components/Services.jsx';
import Newsletter from './components/Newsletter.jsx';
import Subscription from './components/Subscription.jsx';
import Terms from './components/Terms.jsx';
import CDashboard from './client/CDashboard.jsx';
import CMarketplace from './client/CMarketplace.jsx';
import CProfile from './client/CProfile.jsx';
import CSettings from './client/CSettings.jsx';
import CSettingsProfile from './client/CSettingsProfile.jsx';
import CSettingsBill from './client/CSettingsBill.jsx';
import CTracker from './client/CTracker.jsx';
import CBilling from './client/CBilling.jsx';
import CRank from './client/CRank.jsx';
import CSubscribe from './client/CSubscribe.jsx';
import CConnect from './client/CConnect.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Footer />
            </>
          }
        />

        {/* Sample Routing */}
        <Route
          exact
          path="/trial"
          element={
            <>
              <Navbar />
              <Trial />
            </>
          }
        />

        <Route
          exact
          path="/registration"
          element={
            <>
              <Navbar />
              <Reg />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/terms" // Adding :userId parameter
          element={<Terms />} // Rendering CDashboard component
        />
        <Route
          exact
          path="/client/dashboard/:userId" // Adding :userId parameter
          element={<CDashboard />} // Rendering CDashboard component
        />

        <Route
          exact
          path="/client/profile"
          element={<CProfile />}
        />

        <Route
          exact
          path="/client/browse-service"
          element={<CMarketplace />}
        />

        <Route
          exact
          path="/client/settings"
          element={<CSettings />}
        />
        <Route
          exact
          path="/client/settings-profile"
          element={<CSettingsProfile />}
        />
        <Route
          exact
          path="/client/settings-bill"
          element={<CSettingsBill />}
        />

        <Route
          exact
          path="/client/tracker"
          element={<CTracker />}
        />
        
        <Route
          exact
          path="/client/billing"
          element={<CBilling />}
        />
        <Route
          exact
          path="/client/subscribe"
          element={<CSubscribe />}
        />
        <Route
          exact
          path="/client/service-connect"
          element={<CConnect />}
        />
        <Route
          exact
          path="/client/leaderboard"
          element={<CRank />}
        />

      </Routes>
      
    </div>
  );
}

export default App;