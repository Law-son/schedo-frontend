import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleEvent = () => {/*************  ✨ Codeium Command 🌟  *************/
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const formatDate = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateTime.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateTime) => {
    let hours = dateTime.getHours();
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours = 0, make it 12 (for 12 AM)
    
    return `${hours}:${minutes} ${ampm}`;
  };
  
  

  // Function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // Get the first file (since we allow only one image)
    setSelectedImage(URL.createObjectURL(file)); // Preview the uploaded image
  }, []);

  // Setting up the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one image at a time
  });

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
      event: id,
    };

    console.log("Registration Data:", registrationData); // For testing, log the data

    // Optionally, navigate to a confirmation page or show a success message
    // navigate('/confirmation'); // Uncomment and use this line if you have a confirmation page
  };

  return (
    <section className="lg:w-full">
      <div className="w-[95%] py-2 h-[55px] border-gray-400 text-left mx-auto border-b-2 mt-6">
        <h1 className="text-3xl text-blue-black font-semibold">
          Schedule Event
        </h1>
      </div>
      <div className="flex flex-col px-8 py-8 lg:flex-row">
        <div className="flex flex-col justify-between md:flex-row lg:flex-col">
          <div className="flex flex-col">
            <h3 className="text-xl self-start text-left mb-4 text-gray-500 font-semibold">
              Upload event image here
            </h3>
            {/* Container for drag and drop or click */}
            <div
              {...getRootProps()}
              className={`border-dashed border-2 bg-primary-grey p-6 w-80 h-80 flex flex-col justify-center items-center cursor-pointer ${
                isDragActive ? "border-blue-500" : "border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-500">Drop the image here...</p>
              ) : (
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>
          </div>

          {/* Preview the uploaded image */}
          {selectedImage && (
            <div className="flex justify-end mt-10 w-full">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-[355px] ml-24 h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="text-left relative mt-10 lg:ml-12 lg:w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <input
                  type="location"
                  id="location"
                  name="location"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="1">Concerts</option>
                    <option value="2">Sports</option>
                    <option value="3">Theater</option>
                    <option value="4">Comedy</option>
                    <option value="5">Music</option>
                    <option value="6">Food and Drink</option>
                    <option value="7">Arts and Culture</option>
                    <option value="8">Community</option>
                    <option value="8">Tech</option>
                    <option value="9">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="visibility"
                  className="block text-sm font-medium text-gray-700"
                >
                  Visibility
                </label>
                <div className="mt-1">
                  <select
                    id="visibility"
                    name="visibility"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select visibility</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date & Time
                </label>
                <DatePicker
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </div>
              <div className="mt-4 md:mt-0">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date & Time
                </label>
                <DatePicker
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </div>
            </div>
            <div>
                <label
                  htmlFor="mode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mode of Event
                </label>
                <div className="mt-1">
                  <select
                    id="mode"
                    name="mode"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select mode of event</option>
                    <option value="in_person">In-Person</option>
                    <option value="online">Online</option>
                  </select>
                </div>
              </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Schedule Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ScheduleEvent;
