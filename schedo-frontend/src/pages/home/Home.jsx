import React from 'react'
import NavBar from "../../components/navbar/NavBar";
import HeroSection from '../../components/heroSection/HeroSection';
import EventsSection from '../../components/events/EventsSection';
import ServicesSection from '../../components/services/ServicesSection';
import AboutSection from '../../components/about/AboutSection';
import ContactSection from '../../components/contact/ContactSection';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return <>
    <NavBar />
    <HeroSection />
    <EventsSection />
    <ServicesSection />
    <AboutSection />
    <ContactSection />
    <Footer />
  </>;
}

export default Home
