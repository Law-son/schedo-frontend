import React, { useState } from "react";
import { useEvent } from "../../context/EventContext";
import DataTable from "react-data-table-component";
import Button from "../../components/nativeComponents/Button";
import { Edit, Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#000",
    },
  },
};

const ManageEvents = () => {
  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = React.useState(false);
  const { events, archiveEvent, error } = useEvent();
  const navigate = useNavigate();

  // Event Handlers for Edit, View, and Delete actions
  const handleEdit = (event) => {
    navigate(`/dashboard/update`, { state: event });
    console.log("selected event: ", event);
  };

  const handleView = (event) => {
    navigate(`/dashboard/view`, { state: event });
  };

  const handleArchive = async (event) => {
    try {
      await archiveEvent(event.id);
      setOpen(true);
    } catch (error) {
      console.error("Failed to archive event:", error);
    }
  };

  const handleScheduleEvent = () => {
    navigate("/dashboard/schedule");
  };

  // DataTable columns (moved inside the component)
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
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-3">
          <button
            onClick={() => handleView(row)}
            className="text-green-500 hover:text-green-700"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleArchive(row)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  // Filter attendees based on search input
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(filterText.toLowerCase()) ||
      event.start_date.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="upcoming-events flex flex-col items-start my-4 bg-primary-grey rounded-xl py-4 px-4 mx-4 w-[360px] md:w-[96.5%] lg:w-full lg:mx-0">
      <div className="flex justify-end items-center my-4 w-full">
        <Button onClick={handleScheduleEvent}>Schedule an Event</Button>
      </div>
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Event has been moved to your archives
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageEvents;
