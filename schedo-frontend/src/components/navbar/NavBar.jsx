import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarLink } from 'flowbite-react';

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar fluid={true} rounded={false} className="bg-white px-4">
      <NavbarBrand href="#">
        <span className="self-center whitespace-nowrap text-2xl font-semibold text-primary-blue md:text-4xl">
          Schedo
        </span>
      </NavbarBrand>
      <NavbarToggle onClick={handleToggleClick} />
      <NavbarCollapse className={`md:flex md:items-center ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col md:flex-row md:space-x-4 md:items-center">
          <NavbarLink
            href="#"
            active={activeLink === "Home"}
            className={`${activeLink === "Home" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            onClick={() => handleLinkClick("Home")}
          >
            Home
          </NavbarLink>
          <NavbarLink
            href="#"
            active={activeLink === "Events"}
            className={`${activeLink === "Events" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            onClick={() => handleLinkClick("Events")}
          >
            Events
          </NavbarLink>
          <NavbarLink
            href="#"
            active={activeLink === "About"}
            className={`${activeLink === "About" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            onClick={() => handleLinkClick("About")}
          >
            About
          </NavbarLink>
          <NavbarLink
            href="#"
            active={activeLink === "Services"}
            className={`${activeLink === "Services" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            onClick={() => handleLinkClick("Services")}
          >
            Services
          </NavbarLink>
          <NavbarLink
            href="#"
            active={activeLink === "Contact"}
            className={`${activeLink === "Contact" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            onClick={() => handleLinkClick("Contact")}
          >
            Contact
          </NavbarLink>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;

