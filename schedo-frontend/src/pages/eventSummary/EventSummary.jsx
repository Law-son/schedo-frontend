import React, { useEffect } from 'react';
import { Calendar, MapPin, Tag, Watch } from 'lucide-react';
import Button from '../../components/nativeComponents/Button';
import { useEvent } from '../../context/EventContext'; 
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';

const EventSummary = () => {
  const { selectedEvent } = useEvent(); // Access the selected event from context
  const navigate = useNavigate();

  // Use useEffect to navigate when there is no event data
  useEffect(() => {
    if (!selectedEvent) {
      navigate('/#events'); // Navigate to events page
    }
  }, [selectedEvent, navigate]);

  // If no event data exists, return null to prevent rendering
  if (!selectedEvent) {
    return null;
  }

  const { id, title, description, start_date, end_date, start_time, end_time, location, thumbnail, category } = selectedEvent;
  const formattedDate = formatDate(start_date);

  // Handler for booking
  const handleBookNow = () => {
    // Construct the URL and pass the event details as state
    navigate('/register', {
      state: {
        id,
        title,
        description,
        start_date,
        end_date,
        start_time,
        end_time,
        thumbnail,
        location,
        category,
      }
    });
  };

  return (
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] mx-auto rounded-2xl border-gray-400 border-2 overflow-hidden bg-white">
      <div className="w-[95%] py-2 h-[55px] border-gray-400 text-left mx-auto border-b-2 mt-6">
        <h1 className="text-3xl text-blue-black font-semibold">Event Summary</h1>
      </div>
      <div className="flex flex-col px-8 py-8 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <img
            alt="Event image"
            className="object-cover rounded-xl h-[200px] md:h-[250px] lg:h-[300px] bg-center w-full"
            src={thumbnail}
          />
          <div className="pt-6 text-left">
            <h3 className="font-bold text-blue-black text-lg mb-2">{title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Tag className="h-4 w-4 mr-1" />
              {category}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </div>
            <div className="flex text-sm text-gray-600">
              <div className="flex items-center mb-2">
                <Watch className="h-4 w-4 mr-1" />
                From {start_time}
              </div>
              <div className="flex items-center ml-4 mb-2">To {end_time}</div>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>
        </div>
        <div className="w-full text-left lg:w-1/2 relative">
          <h3 className="font-bold text-blue-black text-lg mb-2 lg:ml-6">More Details</h3>
          <p className="text-sm text-gray-600 lg:ml-6">{description}</p>
          <div className="flex w-full justify-end right-0 lg:absolute lg:bottom-0 lg:mt-0">
            <Button className="mt-[30px]" onClick={handleBookNow}>Book Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSummary;
