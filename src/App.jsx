import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styles from "./styles.js";
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Careers from './components/Careers.jsx';
import Testimonials from './components/Testimonials.jsx';

function App() {
  return (
    <div>
      <div>
          <Navbar />
      </div>
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
        <div>
          <Careers />
        </div>
        <div>
          <Testimonials />
        </div>
      </div>
    </div>
  )
}

export default App
