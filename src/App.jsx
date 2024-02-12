import React from 'react'
import styles from "./styles.js";

import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';

function App() {
  return (
    <div>
      <div>
          <Navbar />
      </div>
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <About />
        </div>
      </div>
    </div>
  )
}

export default App
