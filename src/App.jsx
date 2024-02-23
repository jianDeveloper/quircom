import React from 'react'
import styles from "./styles.js";
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Careers from './components/Careers.jsx';
import Testimonials from './components/Testimonials.jsx';
import Login from './components/Login.jsx';

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
          <Careers />
          <Testimonials />
        </div>         
      </div>
    </div>
  )
}

export default App
