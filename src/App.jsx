import React from 'react'
import styles from "./styles.js";
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Login from './components/Login.jsx';
import Testimonials from './components/Testimonials.jsx';
import Stats from './components/Stats.jsx';
import Newsletter from './components/Newsletter.jsx';
import Subscription from './components/Subscription.jsx';

function App() {
  
  return (
    <div>
      <div>
          <Navbar />
          <Login />
      </div>
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
          <Stats />
          <Services />
          <Subscription />
          <Testimonials />
          <Newsletter />
        </div>   
      </div>
    </div>
  )
}

export default App
