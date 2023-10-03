import React from 'react'
import HomeVideo from './HomeComponents/HomeVideo'
import HomeExperties from './HomeComponents/HomeExperties'
import Homeadress from './HomeComponents/Homeadress'
import HomeafterbeforeSlider from './HomeComponents/HomeafterbeforeSlider'
import './Home.css'
import HomeVisit from './HomeComponents/HomeVisit'
import HomeService from './HomeComponents/HomeService'
import HomeMap from './HomeComponents/HomeMap'
import HomeCrousel from './HomeComponents/HomeCrousel'

const Home = () => {
  return (
    <div>
        <HomeVideo/>
        <HomeExperties/>
        <Homeadress/>
        <HomeVisit/>
        <HomeafterbeforeSlider/> 

        <HomeCrousel/>

        <HomeMap/>
    </div>
  )
}

export default Home