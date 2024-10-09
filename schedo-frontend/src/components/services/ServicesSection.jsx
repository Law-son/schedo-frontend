import { Bell, Calendar, Clock } from "lucide-react";
import React from 'react';
import ServiceCard from '../services/ServiceCard';

const ServicesSection = () => {
    return (
        <section id="services" className="pb-8 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
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
                  <div className="flex justify-center items-center h-14 w-14 rounded-xl bg-primary-blue">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                }
              />
              <ServiceCard
                title="Integration with your Favorite Tools"
                details="Integrate your event scheduling with other tools to enhance your workflow."
                icon={
                  <div className="flex justify-center items-center h-14 w-14 rounded-xl bg-primary-blue">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                }
              />
              <ServiceCard
                title="Friendly Notifications"
                details="Get friendly notifications when your guests book or cancel their appointments."
                icon={
                  <div className="flex justify-center items-center h-14 w-14 rounded-xl bg-primary-blue">
                    <Bell className="h-8 w-8 text-white" />
                  </div>
                }
              />
            </div>
          </div>
        </section>
      );
}

export default ServicesSection

