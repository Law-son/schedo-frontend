import React from 'react';
import ServiceCard from '../services/ServiceCard';

const ServicesSection = () => {
    return (
        <section className="pb-8 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                  <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-blue-black dark:text-white sm:text-4xl md:text-[40px]">
                    What We Offer
                  </h2>
                  <p className="text-base text-body-color text-blue-black">
                    At Schedo, we value customer satisfaction. These are the services we offer.
                  </p>
                </div>
              </div>
            </div>
            <div className="-mx-4 flex flex-wrap">
            <ServiceCard
                title="Quick & Easy Event Scheduling"
                details="Easily schedule your events with our platform. No hassle, no stress."
                icon={
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.4625 1.2374C22.7375 -0.393851 17.4625 5.7374 13.4625 14.9624C10.4375 19.4061 9.46253 23.9624 11.4625 27.6749C13.4625 31.4436 17.2375 33.9186 21.4625 34.7624C22.4625 34.9311 23.4625 35.0436 24.4625 35.0436C30.4625 35.0436 35.4625 29.2499 34.4625 21.4624C33.4625 11.8124 28.4625 2.9249 27.4625 1.2374ZM28.4625 20.5874C28.4625 21.0374 28.4625 21.4874 28.4625 21.8811L19.4625 17.0999V3.5999C19.9125 3.65615 20.3625 3.7124 20.8125 3.76865C28.9875 5.1749 34.4625 12.7124 28.4625 20.5874ZM16.4625 3.5999V16.7624H3.60003C3.65628 16.3124 3.71253 15.8624 3.76878 15.4124C4.95003 8.83115 10.4625 4.10615 16.4625 3.5999ZM15.4625 32.4624C11.6875 31.5561 8.46253 29.4186 6.26878 26.2124C4.80628 24.1311 3.96253 21.7124 3.60003 19.4624H17.775L31.05 24.2436C28.2938 29.9811 21.9625 33.4686 15.4625 32.4624Z"
                      fill="white"
                    />
                  </svg>
                }
              />
              <ServiceCard
                title="Integration with your Favorite Tools"
                details="Integrate your event scheduling with other tools to enhance your workflow."
                icon={
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.4625 1.2374C22.7375 -0.393851 17.4625 5.7374 13.4625 14.9624C10.4375 19.4061 9.46253 23.9624 11.4625 27.6749C13.4625 31.4436 17.2375 33.9186 21.4625 34.7624C22.4625 34.9311 23.4625 35.0436 24.4625 35.0436C30.4625 35.0436 35.4625 29.2499 34.4625 21.4624C33.4625 11.8124 28.4625 2.9249 27.4625 1.2374ZM28.4625 20.5874C28.4625 21.0374 28.4625 21.4874 28.4625 21.8811L19.4625 17.0999V3.5999C19.9125 3.65615 20.3625 3.7124 20.8125 3.76865C28.9875 5.1749 34.4625 12.7124 28.4625 20.5874ZM16.4625 3.5999V16.7624H3.60003C3.65628 16.3124 3.71253 15.8624 3.76878 15.4124C4.95003 8.83115 10.4625 4.10615 16.4625 3.5999ZM15.4625 32.4624C11.6875 31.5561 8.46253 29.4186 6.26878 26.2124C4.80628 24.1311 3.96253 21.7124 3.60003 19.4624H17.775L31.05 24.2436C28.2938 29.9811 21.9625 33.4686 15.4625 32.4624Z"
                      fill="white"
                    />
                  </svg>
                }
              />
              <ServiceCard
                title="Friendly Notifications"
                details="Get friendly notifications when your guests book or cancel their appointments."
                icon={
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.4625 1.2374C22.7375 -0.393851 17.4625 5.7374 13.4625 14.9624C10.4375 19.4061 9.46253 23.9624 11.4625 27.6749C13.4625 31.4436 17.2375 33.9186 21.4625 34.7624C22.4625 34.9311 23.4625 35.0436 24.4625 35.0436C30.4625 35.0436 35.4625 29.2499 34.4625 21.4624C33.4625 11.8124 28.4625 2.9249 27.4625 1.2374ZM28.4625 20.5874C28.4625 21.0374 28.4625 21.4874 28.4625 21.8811L19.4625 17.0999V3.5999C19.9125 3.65615 20.3625 3.7124 20.8125 3.76865C28.9875 5.1749 34.4625 12.7124 28.4625 20.5874ZM16.4625 3.5999V16.7624H3.60003C3.65628 16.3124 3.71253 15.8624 3.76878 15.4124C4.95003 8.83115 10.4625 4.10615 16.4625 3.5999ZM15.4625 32.4624C11.6875 31.5561 8.46253 29.4186 6.26878 26.2124C4.80628 24.1311 3.96253 21.7124 3.60003 19.4624H17.775L31.05 24.2436C28.2938 29.9811 21.9625 33.4686 15.4625 32.4624Z"
                      fill="white"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </section>
      );
}

export default ServicesSection


