import { Calendar, MapPin, Star } from "lucide-react"
import { formatDate } from "../../utils/dateFormatter"
import Button from '../nativeComponents/Button';
import { useNavigate } from "react-router-dom";

import React from 'react'

const EventCard = ({ id, title, description, start_date, end_date, start_time, end_time, location, category, is_online, thumbnail }) => {
  let formattedDate = formatDate(start_date);

  const navigate = useNavigate();

  // Handle event click, navigate to EventSummary page with the event data
  const handleEventClick = () => {
    navigate(`/event-summary/${id}`, {
      state: {
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
        thumbnail
      },
    });
  };

    return (
      <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-500" onClick={handleEventClick}>
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
            <Button>Book Now</Button>
          </div>
        </div>
      </div>
    )
}

export default EventCard

