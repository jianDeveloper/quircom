import React from 'react'

import styles from "./styles.js";
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Careers from './components/Careers.jsx';


function App() {
  return (
    <div>
      <Navbar />
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
        <Careers />
      </div>
    </div>
  )
}

export default App