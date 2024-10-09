import React from 'react'
import NavBar from "../../components/navbar/NavBar";
import HeroSection from '../../components/heroSection/HeroSection';
import EventsSection from '../../components/events/EventsSection';
import ServicesSection from '../../components/services/ServicesSection';
import AboutSection from '../../components/about/AboutSection';
import ContactSection from '../../components/contact/ContactSection';

const Home = () => {
  return <>
    <NavBar />
    <HeroSection />
    <EventsSection />
    <ServicesSection />
    <AboutSection />
    <ContactSection />
  </>;
}

export default Home
