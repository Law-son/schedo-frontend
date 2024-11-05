import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../context/EventContext";

const ScheduleEvent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
  const [mode, setMode] = useState("");
  const { events, fetchUserEvents, error } = useEvent();
  const navigate = useNavigate();

  const formatDate = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateTime) => {
    let hours = dateTime.getHours();
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("title", title);
    submissionData.append("description", description);
    submissionData.append("location", location);
    submissionData.append("category", category);
    submissionData.append("start_date", formatDate(startDateTime));
    submissionData.append("end_date", formatDate(endDateTime));
    submissionData.append("start_time", formatTime(startDateTime));
    submissionData.append("end_time", formatTime(endDateTime));
    submissionData.append("is_public", visibility === "public");
    submissionData.append("is_online", mode === "online");

    if (selectedFile) {
      submissionData.append("thumbnail", selectedFile, selectedFile.name);
    } else {
      console.error("Selected image is not valid or undefined.");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/events/create/`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSnackbarMessage("Event created successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Reset form fields on success
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("");
      setVisibility("");
      setMode("");
      setStartDateTime(new Date());
      setEndDateTime(new Date());
      setSelectedFile(null);
      setSelectedImage(null);

      console.log("Response:", response.data);
      await fetchUserEvents();
      navigate(`/dashboard/events`);
    } catch (error) {
      setSnackbarMessage("Error submitting form. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);

      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} // Update state on change
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
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} // Update state on change
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
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // Update state on change
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} // Update state on change
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Concerts">Concerts</option>
                    <option value="Sports">Sports</option>
                    <option value="Theater">Theater</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Music">Music</option>
                    <option value="Food and Drink">Food and Drink</option>
                    <option value="Arts and Culture">Arts and Culture</option>
                    <option value="Community">Community</option>
                    <option value="Tech">Tech</option>
                    <option value="Other">Other</option>
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
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)} // Update state on change
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
                  htmlFor="startDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date & Time
                </label>
                <DatePicker
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date & Time
                </label>
                <DatePicker
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="mode"
                className="block text-sm font-medium text-gray-700"
              >
                Mode
              </label>
              <div className="mt-1">
                <select
                  id="mode"
                  name="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)} // Update state on change
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Snackbar component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default ScheduleEvent;
