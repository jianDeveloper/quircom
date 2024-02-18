import React from 'react'
import styles from "./styles.js";

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

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
      </div>
    </div>
  )
}

export default App
