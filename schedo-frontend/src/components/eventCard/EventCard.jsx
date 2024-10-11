// src/components/EventCard.js

import { useNavigate } from "react-router-dom";
import { useEvent } from "../../context/EventContext";
import React from "react";
import { Calendar, MapPin, Star } from "lucide-react";
import Button from "../nativeComponents/Button";
import { formatDate } from "../../utils/dateFormatter";

const EventCard = ({
  id,
  title,
  description,
  start_date,
  end_date,
  start_time,
  end_time,
  location,
  category,
  is_online,
  thumbnail,
}) => {
  const navigate = useNavigate();
  const { setSelectedEvent } = useEvent(); // Get the setter function from the context

  const handleEventClick = () => {
    // Set the event data in context
    setSelectedEvent({
      id,
      title,
      description,
      start_date,
      end_date,
      start_time,
      end_time,
      location,
      category,
      is_online,
      thumbnail,
    });

    // Navigate to the EventSummary page
    navigate(`/event-summary/${id}`);
  };

  // Handler for booking
  const handleBookNow = (e) => {
    e.stopPropagation(); // Stop event propagation to parent elements

    // Navigate to the registration page and pass the event details as state
    navigate("/register", {
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
      },
    });
  };

  const formattedDate = formatDate(start_date);

  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-500"
      onClick={handleEventClick}
    >
      <img
        alt="Event image"
        className="aspect-video object-cover w-full"
        height="225"
        src={thumbnail}
        width="400"
      />
      <div className="p-4 text-left">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <Star className="h-4 w-4 text-yellow-400" />
            <Star className="h-4 w-4 text-yellow-400" />
            <Star className="h-4 w-4 text-yellow-400" />
            <Star className="h-4 w-4 text-gray-300" />
          </div>
          <Button onClick={handleBookNow}>Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
