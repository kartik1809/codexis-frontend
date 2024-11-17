import React, { useEffect } from 'react'
import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/LandingPage/Benefits";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero"
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/LoaderSlice';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, [])
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
