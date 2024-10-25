import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [archives, setArchives] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/events/user/`
      );
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error); 
      setError("Failed to fetch events");  
    }
  };

  const fetchUserArchives = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/events/archives/`
      );
      console.log("Fetched archives data:", response.data);
      setArchives(response.data.events);  // Ensure backend returns 'archives'
    } catch (error) {
      console.error("Error fetching archives:", error);
      setError("Failed to fetch archives");
    } finally {
      setLoading(false);
    }
  };

  // Archive an event and update context state
  const archiveEvent = async (eventId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/events/archive/${eventId}/`
      );

      setEvents((prevEvents) => {
        const eventToArchive = prevEvents.find(event => event.id === eventId);
        
        if (eventToArchive) {
          setArchives((prevArchives) => [...prevArchives, { ...eventToArchive, archivedId: eventToArchive.id }]); // Save original ID
        } else {
          console.error("Event to archive not found:", eventId);
        }
        
        return prevEvents.filter(event => event.id !== eventId);
      });
      fetchUserEvents();
      fetchUserArchives();
    } catch (error) {
      console.error("Failed to archive event:", error);
      fetchUserEvents();
      fetchUserArchives();
    }
  };  

  // Restore an archived event and update context state
  const restoreEvent = async (eventId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/events/restore/${eventId}/`
      );

      setArchives((prevArchives) => {
        const restoredEvent = prevArchives.find(event => event.archivedId === eventId); // Match with the archivedId

        if (restoredEvent) {
          setEvents((prevEvents) => [...prevEvents, restoredEvent]);
          
        } else {
          console.error("Restored event not found in archives:", eventId);
        }
        return prevArchives.filter(event => event.archivedId !== eventId); // Remove by archivedId
      });
      fetchUserEvents();
      fetchUserArchives();
    } catch (error) {
      console.error("Failed to restore event:", error);
      fetchUserEvents();
      fetchUserArchives();
    }
  };

  

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/events/delete/${eventId}/`
      );
      setArchives((prevArchives) => prevArchives.filter((event) => event.id !== eventId));
      fetchUserEvents();
      fetchUserArchives();
    } catch (error) {
      console.error("Failed to delete event:", error);
      fetchUserEvents();
      fetchUserArchives();
    }
  };

  const deleteAllEvents = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/events/delete/all/`
      );
  
      // Clear the archives immediately after successful deletion
      setArchives(() => []);
  
      // Optionally, refresh events and archives in case other state changes are needed
      fetchUserEvents();
      fetchUserArchives();
    } catch (error) {
      console.error("Failed to delete all events:", error);
      // In case of error, refetch to maintain state consistency
      fetchUserEvents();
      fetchUserArchives();
    }
  };  
  

  const restoreAllEvents = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/events/restore/all/`
      );
  
      setArchives((prevArchives) => {
        const restoredEvents = [...prevArchives];  // Copy previous archives
  
        // Add all archived events to the events list and clear archives
        setEvents((prevEvents) => [...prevEvents, ...restoredEvents]);
  
        return [];  // Clear the archives after restoring
      });
  
      fetchUserEvents();
      fetchUserArchives();
    } catch (error) {
      console.error("Failed to restore all events:", error);
      fetchUserEvents();
      fetchUserArchives();
    }
  };


  const fetchEventAttendance = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/events/attendance/`
      );
      setAttendances(response.data.events);
    } catch (error) {
      console.error("Error fetching event attendees:", error);
      setError("Failed to fetch event attendance");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserEvents();
      await fetchUserArchives();
      await fetchEventAttendance();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        archives,
        attendances,
        loading,
        error,
        selectedEvent,
        archiveEvent,
        restoreEvent,
        deleteEvent,
        restoreAllEvents,
        deleteAllEvents,
        setSelectedEvent,
        fetchUserEvents,
        fetchUserArchives,
        fetchEventAttendance,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
