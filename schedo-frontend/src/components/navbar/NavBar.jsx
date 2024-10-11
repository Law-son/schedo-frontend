import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home"); // Track active item

  const handleItemClick = (item) => {
    setActiveItem(item); // Update the active item
  };

  const getNavItemClass = (item) => {
    return activeItem === item
      ? "text-lg text-primary-blue font-bold md:text-3xl lg:text-sm" // Active item
      : "text-lg text-gray-400 hover:text-gray-500 md:text-3xl lg:text-sm"; // Inactive item
  };

  return (
    <div className="bg-primary-blue z-10">
      <nav className="relative px-4 py-4 flex justify-between items-center w-full bg-white">
        <a className="text-3xl font-bold leading-none" href="#">
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-primary-blue md:text-4xl lg:text-3xl">
            Schedo
          </span>
        </a>
        <div className="lg:hidden ml-auto">
          <button
            className="navbar-burger flex items-center text-primary-blue p-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="block h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <a
              className={getNavItemClass("Home")}
              href="#"
              onClick={() => handleItemClick("Home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={getNavItemClass("Events")}
              href="#events"
              onClick={() => handleItemClick("Events")}
            >
              Events
            </a>
          </li>
          <li>
            <a
              className={getNavItemClass("Services")}
              href="#services"
              onClick={() => handleItemClick("Services")}
            >
              Services
            </a>
          </li>
          <li>
            <a
              className={getNavItemClass("About Us")}
              href="#about"
              onClick={() => handleItemClick("About Us")}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              className={getNavItemClass("Contact")}
              href="#contact"
              onClick={() => handleItemClick("Contact")}
            >
              Contact
            </a>
          </li>
        </ul>
        <Link to="/signin">
          <a
            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-md transition duration-200"
            href="#"
          >
            Sign In
          </a>
        </Link>
        <Link to="/signup">
          <a
            className="hidden lg:inline-block py-2 px-6 bg-primary-blue hover:bg-blue-600 text-sm text-white font-bold rounded-md transition duration-200"
            href="#"
          >
            Sign Up
          </a>
        </Link>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <a
                className="mr-auto text-3xl font-bold leading-none self-center whitespace-nowrap text-primary-blue md:text-4xl lg:text-3xl"
                href="#"
              >
                Schedo
              </a>
              <button
                className="navbar-close"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li>
                  <a
                    className={getNavItemClass("Home")}
                    href="#"
                    onClick={() => handleItemClick("Home")}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className={getNavItemClass("Events")}
                    href="#events"
                    onClick={() => handleItemClick("Events")}
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    className={getNavItemClass("Services")}
                    href="#services"
                    onClick={() => handleItemClick("Services")}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    className={getNavItemClass("About Us")}
                    href="#about"
                    onClick={() => handleItemClick("About Us")}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className={getNavItemClass("Contact")}
                    href="#contact"
                    onClick={() => handleItemClick("Contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <a
                className="block py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                href="#"
              >
                Sign In
              </a>
              <a
                className="block py-2 px-6 bg-primary-blue hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                href="#"
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavBar;
