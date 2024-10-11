import { useLocation } from 'react-router-dom';
import { Calendar, MapPin, Tag, Watch } from "lucide-react";
import Button from "../../components/nativeComponents/Button";
import { useEvent } from "../../context/EventContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter";

const RegisterForEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destructure event details from location state
  const {
    id,
    title,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    location: eventLocation,
    category,
    thumbnail,
  } = location.state || {};

  const formattedDate = formatDate(start_date);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically handle the registration logic, e.g. sending data to a server
    const formData = new FormData(e.target);
    const registrationData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      gender: formData.get("gender"),
      event: id
    };

    console.log("Registration Data:", registrationData); // For testing, log the data

    // Optionally, navigate to a confirmation page or show a success message
    // navigate('/confirmation'); // Uncomment and use this line if you have a confirmation page
  };

  return (
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] mx-auto rounded-2xl border-gray-400 border-2 overflow-hidden bg-white">
      <div className="w-[95%] py-2 h-[55px] border-gray-400 text-left mx-auto border-b-2 mt-6">
        <h1 className="text-3xl text-blue-black font-semibold">Register</h1>
      </div>
      <div className="flex flex-col px-8 py-8 lg:flex-row">
        <div className="hidden w-full lg:w-1/2 lg:block">
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
              {eventLocation}
            </div>
          </div>
        </div>
        <div className="w-full text-left lg:w-1/2 relative lg:ml-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForEvent;
