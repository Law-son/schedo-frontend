import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create a context for event data
const EventContext = createContext();

// Custom hook to use the EventContext
export const useEvent = () => useContext(EventContext);

// EventProvider component to wrap around components that need access to event data
export const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);  // State to store user's events
  const [attendances, setAttendances] = useState([]);  // State to store event attendance
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Function to fetch user's events
  // Function to fetch user events
  const fetchUserEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/user/`);
      setEvents(response.data.events);
      console.log("events: ",response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events');
    }
  };

  // Function to fetch event attendees
  const fetchEventAttendance = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/attendance/`);
      setAttendances(response.data.events);
      console.log("attendance: ",response.data.events);
    } catch (error) {
      console.error('Error fetching event attendees:', error);
      setError('Failed to fetch event attendance');
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserEvents();
      await fetchEventAttendance();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <EventContext.Provider value={{ events, attendances, loading, error, selectedEvent, setSelectedEvent, fetchUserEvents, fetchEventAttendance }}>
      {children}
    </EventContext.Provider>
  );
};

