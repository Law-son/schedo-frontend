import React from 'react'
import NavBar from "../../components/navbar/NavBar";
import HeroSection from '../../components/heroSection/HeroSection';
import EventsSection from '../../components/events/EventsSection';
import ServicesSection from '../../components/services/ServicesSection';

const Home = () => {
  return <>
    <NavBar />
    <HeroSection />
    <EventsSection />
    <ServicesSection />
  </>;
}

export default Home
