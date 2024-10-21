import React, { useState, useEffect } from "react";
import { useEvent } from "../../context/EventContext";
import { Calendar, MapPin, Watch } from "lucide-react";
import DataTable from "react-data-table-component";
import { formatDate } from "../../utils/dateFormatter";

// DataTable columns
const columns = [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.start_date,
    sortable: true,
  },
  {
    name: "Number of Attendees",
    selector: (row) => row.number_of_attendees,
    sortable: true,
  },
];

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
    },
  },
};

const Analytics = () => {
  const [filterText, setFilterText] = useState(""); // State for search input
  const { events, attendances, loading, error } = useEvent();
  // console.log("events", events)
  // console.log("attendances", attendances)

  // Calculate total events
  const totalEvents = events.length;

  // Calculate total attendees by summing up attendees for each event
  const totalAttendees = Array.isArray(attendances) ? attendances.reduce(
    (total, attendee) => total + attendee.number_of_attendees,
    0
  ) : 0;

  // Function to calculate upcoming events within the next 7 days
  const getUpcomingEventsCount = () => {
    const currentDate = new Date();
    const threeWeeksFromNow = new Date();
    threeWeeksFromNow.setDate(currentDate.getDate() + 21);

    return Array.isArray(events) ? events.filter((event) => {
      const eventStartDate = new Date(event.start_date);
      return eventStartDate >= currentDate && eventStartDate <= threeWeeksFromNow;
    }).length : 0;
  };

  // Function to fetch upcoming event within the next 7 days
  const upcomingEvent = events && events.length > 0
    ? events.find((event) => {
        const currentDate = new Date();
        const eventStartDate = new Date(event.start_date);
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(currentDate.getDate() + 7);

        return eventStartDate >= currentDate && eventStartDate <= oneWeekFromNow;
      })
    : null;

  // Get the number of upcoming events
  const upcomingEvents = getUpcomingEventsCount();

  // Filter attendances based on search input
  const filteredEvents =
    Array.isArray(attendances)
      ? attendances.filter(
          (event) =>
            event.title.toLowerCase().includes(filterText.toLowerCase()) ||
            event.start_date.toLowerCase().includes(filterText.toLowerCase())
        )
      : [];

  return (
    <div className="flex flex-col bg-white h-[100vh]">
      {/* Statistics Cards */}
      <div className="stats-cards px-4 flex flex-col py-4 gap-4 lg:flex-row sm:flex-row md:flex-row md:px-4 lg:px-0">
        <div className="card w-full sm:w-1/2 md:w-1/3 flex flex-col border-[0.5px] border-blue-black bg-white rounded-xl justify-center items-center hover:shadow-lg">
          <h1 className="text-[60px] text-blue-black font-bold">
            {totalEvents}
          </h1>
          <p className="text-gray-500 font-bold">Total Events</p>
        </div>
        <div className="card w-full sm:w-1/2 md:w-1/3 flex flex-col border-[0.5px] border-blue-black bg-white rounded-xl justify-center items-center hover:shadow-lg">
          <h1 className="text-[60px] text-blue-black font-bold">
            {totalAttendees}
          </h1>
          <p className="text-gray-500 font-bold">Total Attendees</p>
        </div>
        <div className="card w-full sm:w-1/2 md:w-1/3 flex flex-col border-[0.5px] border-blue-black bg-white rounded-xl justify-center items-center hover:shadow-lg">
          <h1 className="text-[60px] text-blue-black font-bold">
            {upcomingEvents}
          </h1>
          <p className="text-gray-500 font-bold">Upcoming Events</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events flex flex-col items-start my-4 bg-primary-grey rounded-xl py-4 px-4 mx-4 lg:mx-0">
        <h1 className="text-2xl text-blue-black font-bold">Your Next Event</h1>
        <div className="flex justify-between items-center w-full">
          {upcomingEvent ? (
            <div className="flex mt-5 bg-white border-[0.1px] border-gray-300 rounded-xl w-[325px] md:w-[400px] hover:shadow-lg">
              <img
                src={upcomingEvent.thumbnail}
                alt="event"
                className="w-[150px] h-[150px] rounded-tl-xl rounded-bl-xl"
              />
              <div className="flex flex-col justify-start items-start px-2 pt-2">
                <p className="text-blue-black text-left font-bold">
                  {upcomingEvent.title}
                </p>
                <div className="flex items-center text-sm text-gray-600 mb-2 mt-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(upcomingEvent.start_date)}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {upcomingEvent.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Watch className="h-4 w-4 mr-1" />
                  {upcomingEvent.start_time}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-lg">
              You don't have any event happening in the next seven days.
            </p>
          )}
        </div>
      </div>

      {/* Event Statistics */}
      <div className="upcoming-events flex flex-col items-start my-4 bg-primary-grey rounded-xl py-4 px-4 mx-4 w-[360px] md:w-[96.5%] lg:w-full lg:mx-0">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl text-blue-black font-bold">Events</h1>
          <input
            type="text"
            className="mt-3 w- p-2 border rounded-lg text-gray-700"
            placeholder="Search by title or date"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="mt-5 w-full bg-white border-[0.1px] border-gray-300 rounded-xl hover:shadow-lg">
          <DataTable
            columns={columns}
            data={filteredEvents} // Pass filtered data
            pagination
            customStyles={customStyles} // Apply custom styles
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
