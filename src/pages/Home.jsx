import React, { useState } from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Doctor from '../components/Doctor'
import Homeopathy from '../components/Homeopathy'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div style={{ background: 'var(--navy)' }}>
      <Header />
      <SpecialityMenu />
      <Doctor />
      <Homeopathy />
      <Banner />
    </div>
  )
}

export default Home
