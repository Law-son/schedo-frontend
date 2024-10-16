import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Tag, Watch } from "lucide-react";

const ViewEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  // Check if data is defined
  if (!data) {
    return <div>No event data available</div>;
  }

  // Destructure data object
  const {
    id,
    title: eventTitle,
    description: eventDescription,
    start_date: eventStartDate,
    end_date: eventEndDate,
    start_time: eventStartTime,
    end_time: eventEndTime,
    location: eventLocation,
    category: eventCategory,
    is_online: eventIsOnline,
    thumbnail: eventThumbnail,
  } = data;

  // Format event dates
  const formattedDate = `${eventStartDate} - ${eventEndDate}`;

  const handleBookNow = () => {
    // Navigate to booking page or perform booking logic
    console.log("Booking event", id);
  };

  return (
    <section className="lg:w-full">
      <div className="w-[95%] py-2 h-[55px] border-gray-400 text-left mx-auto border-b-2 mt-6">
        <h1 className="text-3xl text-blue-black font-semibold">Event</h1>
      </div>
      <div className="flex flex-col px-8 py-8 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <img
            alt="Event image"
            className="object-cover rounded-xl h-[200px] md:h-[250px] lg:h-[300px] bg-center w-full"
            src={eventThumbnail}
          />
          <div className="pt-6 text-left">
            <h3 className="font-bold text-blue-black text-lg mb-2">
              {eventTitle}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Tag className="h-4 w-4 mr-1" />
              {eventCategory}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </div>
            <div className="flex text-sm text-gray-600">
              <div className="flex items-center mb-2">
                <Watch className="h-4 w-4 mr-1" />
                From {eventStartTime}
              </div>
              <div className="flex items-center ml-4 mb-2">
                To {eventEndTime}
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {eventLocation}
            </div>
          </div>
        </div>
        <div className="w-full text-left lg:w-1/2 relative">
          <h3 className="font-bold text-blue-black text-lg mb-2 lg:ml-6">
            More Details
          </h3>
          <p className="text-sm text-gray-600 lg:ml-6">{eventDescription}</p>
        </div>
      </div>
    </section>
  );
};

export default ViewEvent;
