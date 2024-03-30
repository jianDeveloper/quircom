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
import CDashboard from './client/CDashboard.jsx';
import CMarketplace from './client/CMarketplace.jsx';
import CProfile from './client/CProfile.jsx';
import CSettings from './client/CSettings.jsx';
import CSettingsProfile from './client/CSettingsProfile.jsx';
import CSettingsBill from './client/CSettingsBill.jsx';
import CTracker from './client/CTracker.jsx';
import Billing from './components/Billing.jsx';

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
              <Stats />
              <Services />
              <Subscription />
              <Newsletter />
              <Footer />
              <Billing />
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
          path="/client/dashboard/:userId" // Adding :userId parameter
          element={<CDashboard />} // Rendering CDashboard component
        />

        <Route
          exact
          path="/client/profile/:userId"
          element={<CProfile />}
        />

        <Route
          exact
          path="/client/browse-service/:userId"
          element={<CMarketplace />}
        />

        <Route
          exact
          path="/client/settings/:userId"
          element={<CSettings />}
        />
        <Route
          exact
          path="/client/settings-profile/:userId"
          element={<CSettingsProfile />}
        />
        <Route
          exact
          path="/client/settings-bill/:userId"
          element={<CSettingsBill />}
        />

        <Route
          exact
          path="/client/tracker/:userId"
          element={<CTracker />}
        />
      </Routes>
    </div>
  );
}

export default App;
