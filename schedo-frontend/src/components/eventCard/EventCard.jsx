import { Calendar, MapPin, Star } from "lucide-react"
import { formatDate } from "../../utils/dateFormatter"
import Button from '../nativeComponents/Button';

import React from 'react'

const EventCard = ({ title, date, location, image }) => {
  let formattedDate = formatDate(date);
    return (
      <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-500">
        <img
          alt="Event image"
          className="aspect-video object-cover w-full"
          height="225"
          src={image}
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
