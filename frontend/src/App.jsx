import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Reg from "./components/Reg.jsx";
import Footer from "./components/Footer.jsx";
import Terms from "./components/Terms.jsx";
import Forgot from "./components/Forgot.jsx";
import ResetPass from "./components/ResetPass.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Verify from "./components/Verify.jsx";
import VerifySuccess from "./components/VerificationSuccess.jsx";

// Admin Imports =============================================================
import ALogPage from "./admin/ALogPage.jsx";
import ADashboard from "./admin/ADasboard.jsx";

// Client Imports =============================================================
import CDashboard from "./client/CDashboard.jsx";
import CMarketplace from "./client/CMarketplace.jsx";
import CProfile from "./client/CProfile.jsx";
import CSettings from "./client/CSettings.jsx";
import CSettingsProfile from "./client/Settingcomponents/CSettingsProfile.jsx";
import CSettingsBill from "./client/Settingcomponents/CSettingsBill.jsx";
import CRank from "./client/CRank.jsx";
import CSubscribe from "./client/CSubscribe.jsx";
import CConnect from "./client/Marketcomponents/CConnect.jsx";
import Project from "./client/Dashcomponents/Project.jsx";
import CViewProfile from "./client/CViewProfile.jsx";

// Freelancer Imports =========================================================
import FRank from "./fl/FRank.jsx";
import FDashboard from "./fl/FDashboard.jsx";
import FProfile from "./fl/FProfile.jsx";
import FViewProfile from "./fl/FViewProfile.jsx";
import FSettings from "./fl/FSettings.jsx";
import FSettingsProfile from "./fl/FSettingsProfile.jsx";
import FMarketplace from "./fl/FMarketplace.jsx";
import FConnect from "./fl/FMarketComponents/FConnect.jsx";

function App() {
  return (
    <div>
      <ToastContainer />

      {/* Main Routing */}
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
        <Route exact path="/page-not-found" element={<NotFoundPage />} />
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
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route exact path="/reset-pass/:userId" element={<ResetPass />} />
        <Route exact path="/verify/:userId" element={<Verify />} />
        <Route
          exact
          path="/verify-success/:userId"
          element={<VerifySuccess />}
        />
        {/* Admin Routes
        <Route
          exact
          path="/admin/dashboard/:userId"
          element={<ADashboard />} 
        /> */}

        {/* Client Routes */}
        <Route
          exact
          path="/client/dashboard/:userId"
          element={<CDashboard />}
        />
        <Route 
          exact 
          path="/client/profile/:userId" 
          element={<CProfile />} 
        />
        <Route
          exact
          path="/client/view-profile/:userId/:viewId"
          element={<CViewProfile />}
        />
        <Route
          exact
          path="/client/browse-service/:userId"
          element={<CMarketplace />}
        />
        <Route exact path="/client/settings/:userId" element={<CSettings />} />
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
          path="/client/subscribe/:userId"
          element={<CSubscribe />}
        />
        <Route exact path="/client/projects/:userId" element={<Project />} />
        <Route
          exact
          path="/client/service-connect/:userId/:serviceId"
          element={<CConnect />}
        />
        <Route exact path="/client/leaderboard/:userId" element={<CRank />} />

        {/* ROUTE FOR FREELANCER */}
        <Route
          exact
          path="/freelancer/dashboard/:userId"
          element={<FDashboard />}
        />
        <Route
          exact
          path="/freelancer/profile/:userId"
          element={<FProfile />}
        />
        <Route
          exact
          path="/freelancer/view-profile/:userId/:viewId"
          element={<FViewProfile />}
        />
        <Route
          exact
          path="/freelancer/leaderboard/:userId"
          element={<FRank />}
        />
        <Route
          exact
          path="/freelancer/settings/:userId"
          element={<FSettings />}
        />
        <Route
          exact
          path="/freelancer/settings-profile/:userId"
          element={<FSettingsProfile />}
        />
        <Route
          exact
          path="/freelancer/browse-commission/:userId"
          element={<FMarketplace />}
        />
        <Route
          exact
          path="/freelancer/commission-connect/:userId"
          element={<FConnect />}
        />

        {/* ROUTE FOR Admin */}
        <Route exact path="/admin" element={<ALogPage />} />
        <Route exact path="/admin/dashboard/:userId" element={<ADashboard />} />
      </Routes>
    </div>
  );
}

export default App;
