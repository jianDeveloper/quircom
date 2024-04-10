import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Trial from './components/sample.jsx';
import Reg from './components/Reg.jsx';
import Footer from './components/Footer.jsx';
import Terms from './components/Terms.jsx';
import CDashboard from './client/CDashboard.jsx';
import CMarketplace from './client/CMarketplace.jsx';
import CProfile from './client/CProfile.jsx';
import CSettings from './client/CSettings.jsx';
import CSettingsProfile from './client/Settingcomponents/CSettingsProfile.jsx';
import CSettingsBill from './client/Settingcomponents/CSettingsBill.jsx';
import CTracker from './client/CTracker.jsx';
import CBilling from './client/CBilling.jsx';
import CRank from './client/CRank.jsx';
import CSubscribe from './client/CSubscribe.jsx';
import CConnect from './client/Marketcomponents/CConnect.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FDashboard from './fl/FDashboard.jsx';
// import FProfile from './fl/FProfile.jsx';
// import FMarketplace from './fl/FMarketplace.jsx';
// import FSettings from './fl/FSettings.jsx';
// import FSettingsProfile from './fl/FSettingsProfile.jsx';
// import FTracker from './fl/FTracker.jsx';
// import FUpload from './fl/FUpload.jsx';
// import FConnect from './fl/FConnect.jsx';

function App() {
  return (
    <div>
      <ToastContainer/>
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
          path="/terms"
          element={<Terms />}
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
        
        <Route
          exact
          path="/client/billing/:userId"
          element={<CBilling />}
        />
        <Route
          exact
          path="/client/subscribe/:userId"
          element={<CSubscribe />}
        />
        <Route
          exact
          path="/client/service-connect/:userId"
          element={<CConnect />}
        />
        <Route
          exact
          path="/client/leaderboard/:userId"
          element={<CRank />}
        />
        <Route
          exact
          path="/freelancer/dashboard/" // Adding :userId parameter
          element={<FDashboard />} // Rendering CDashboard component
        />
{/* {
        <Route
          exact
          path="/freelancer/profile/:userId"
          element={<FProfile />}
        /> } */}

       {/* <Route
          exact
          path="/freelancer/browse-service/:userId"
          element={<FMarketplace />}
        />  */}

        {/* <Route
          exact
          path="/freelancer/settings/:userId"
          element={<FSettings />}
        />
        <Route
          exact
          path="/freelancer/settings-profile/:userId"
          element={<FSettingsProfile />}
        />  */}

        {/* <Route
          exact
          path="/freelancer/tracker/:userId"
          element={<FTracker />}
        />

        <Route
          exact
          path="/freelancer/service-connect/:userId"
          element={<FConnect />}
        />

        <Route
          exact
          path="/freelancer/service-upload/:userId"
          element={<FUpload />}
        /> */}
       
      </Routes>
      
    </div>
  );
}

export default App;