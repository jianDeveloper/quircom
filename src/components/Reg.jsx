import React from 'react'

import BGreg from '../assets/bgreg.png';

const Reg = () => {
  return (
    <section className="">
      <div className="h-screen" style={{background: `url(${BGreg})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
      <h1>Hello World</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim blanditiis atque iste commodi sint exercitationem laudantium temporibus quos! Nobis, veniam voluptate. A nulla sequi dignissimos deleniti, suscipit obcaecati veniam necessitatibus.</p>
    </div>
    </section>
    
  )
}

export default Reg