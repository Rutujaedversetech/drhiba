import React from 'react'
import AboutBack from './Aboutcompo/AboutBack'
import AboutSecsection from './Aboutcompo/AboutSecsection'
import HomeafterbeforeSlider from '../Home/HomeComponents/HomeafterbeforeSlider'
import HomeService from '../Home/HomeComponents/HomeService'

const About = () => {
  return (
    <div>
      <AboutBack/>
      <AboutSecsection/>
      <HomeafterbeforeSlider/>
      <HomeService/>
    </div>
  )
}

export default About