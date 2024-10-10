import React from "react";
import FadeInAnimation from "../FadeInAnimation/FadeInAnimation";

const AboutSection = () => {
  return (
    <FadeInAnimation>
      <section
        id="about"
        className="overflow-hidden pt-20 pb-12 px-10 lg:pt-[120px] lg:pb-[90px] dark:bg-dark"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-primary-blue">
                  About Us
                </span>
                <h2 className="mb-5 text-3xl font-bold text-blue-black dark:text-white sm:text-[40px]/[48px]">
                  Schedo: Your Event Scheduling Platform
                </h2>
                <p className="mb-8 text-base text-body-color dark:text-gray-400">
                  Schedo is an event scheduling platform that helps you create
                  and manage events, appointments, and meetings. We make it easy
                  to schedule events and appointments, and send out reminders
                  and notifications to your guests.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-gray-400">
                  Our mission is to make event scheduling simple, efficient, and
                  enjoyable. We believe that event scheduling should be easy,
                  and that everyone should have the tools they need to create
                  and manage events with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInAnimation>
  );
};

export default AboutSection;
