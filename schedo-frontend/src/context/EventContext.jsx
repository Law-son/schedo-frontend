// src/context/EventContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a context for event data
const EventContext = createContext();

// Custom hook to use the EventContext
export const useEvent = () => useContext(EventContext);

// EventProvider component to wrap around components that need access to event data
export const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </EventContext.Provider>
  );
};
