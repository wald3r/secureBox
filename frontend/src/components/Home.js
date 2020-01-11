import React, { useState } from 'react'
import '../stylesheets/general.css'
import welcome1 from '../pictures/welcome1.jpg'
import welcome2 from '../pictures/welcome2.jpg'
import welcome3 from '../pictures/welcome3.jpg'
import welcome4 from '../pictures/welcome4.jpg'

const Home = (props) => {

  const [pictures, setPictures] = useState([welcome1, welcome2, welcome3, welcome4])

  const randInt = Math.floor(Math.random() *4)
  
  return (
    <div>
      <br></br>
      <img src={pictures[randInt]} />
    </div>
  )
}

export default Home