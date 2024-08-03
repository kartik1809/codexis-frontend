import React from 'react'
import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/LandingPage/Benefits";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero"

const Home = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header/>
        <Hero/>
        <Benefits/>
        <Footer/>
      </div>
      <ButtonGradient/>
    </>
  )
}

export default Home
