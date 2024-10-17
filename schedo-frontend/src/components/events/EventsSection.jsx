import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../eventCard/EventCard";
import Input from "../nativeComponents/Input";
import Button from "../nativeComponents/Button";
import { Search } from "lucide-react";
import ReactPaginate from "react-paginate";
import eventsData from "./eventsData";
import FadeInAnimation from "../FadeInAnimation/FadeInAnimation";
import ClipLoader from "react-spinners/ClipLoader";


const EventsSection = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search input
  const [currentPage, setCurrentPage] = useState(0);
  const [eventsData, setEventsData] = useState([]); // State to hold fetched events
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const eventsPerPage = 6;

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/events/public/`
        );
        
        // Check if the response has the 'events' field with data
        if (response.data && response.data.events && response.data.events.length > 0) {
          setEventsData(response.data.events); // Access 'events' array
          console.log("Response:", response.data.events);
        } else {
          setError("No events available");
        }
      } catch (err) {
        console.error("Error fetching events:", err); // Log the error object
        if (err.response) {
          // Server responded with a status other than 200 range
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          console.error("Response headers:", err.response.headers);
          setError(`Error: ${err.response.status} - ${err.response.data}`);
        } else if (err.request) {
          // Request was made but no response received
          console.error("Request data:", err.request);
          setError("No response from the server");
        } else {
          // Something else happened
          console.error("Error message:", err.message);
          setError("Request failed");
        }
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };    

    fetchEvents();
  }, []);

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(0); // Reset to first page when search term changes
  };

  // Filter the events based on the search term
  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchTerm)
  );

  // Calculate the index range for the current page
  const offset = currentPage * eventsPerPage;
  const currentEvents = filteredEvents.slice(offset, offset + eventsPerPage);
  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Render the component
  if (loading) {
    return (
      <div className="loading-indicator">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-blue-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Discover Amazing Events
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Find and book tickets for the hottest concerts, sports events,
                and more.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Search events"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange} // Update search term on input
                />
                <Button type="button" variant="secondary">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FadeInAnimation>
        <section
          id="events"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl text-blue-black font-bold tracking-tighter sm:text-5xl text-center mb-16">
              Upcoming Events
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {currentEvents.length > 0 ? (
                currentEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    start_date={event.start_date}
                    end_date={event.end_date}
                    start_time={event.start_time}
                    end_time={event.end_time}
                    location={event.location}
                    category={event.category}
                    is_online={event.is_online}
                    thumbnail={event.thumbnail}
                  />
                ))
              ) : (
                <p className="text-center col-span-3 text-xl text-gray-500">
                  No events with that title found.
                </p>
              )}
            </div>

            {/* Pagination Component */}
            {filteredEvents.length > eventsPerPage && (
              <div className="flex justify-center mt-14">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"flex space-x-4"} // Display items horizontally with spacing
                  activeClassName={
                    "bg-primary-blue text-white font-bold px-3 py-1 rounded"
                  }
                  pageClassName={"page-item"}
                  pageLinkClassName={
                    "page-link py-1 rounded hover:bg-gray-300 transition"
                  }
                  previousClassName={
                    "prev-item bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                  }
                  nextClassName={
                    "next-item bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                  }
                  disabledClassName={"text-gray-400 cursor-not-allowed"}
                />
              </div>
            )}
          </div>
        </section>
      </FadeInAnimation>
    </div>
  );
};

export default EventsSection;
