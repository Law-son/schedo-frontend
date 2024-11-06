import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const Ticket = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/registrations/ticket/${id}/`
        );

        console.log("Response data:", response.data);

        // Check if the response has a success status
        if (response.data.status === "success" && response.data.ticket) {
          setTicketData(response.data.ticket);
        } else if (response.data.status === "error" && response.data.message) {
          setErrorMessage(response.data.message);
        } else {
          setErrorMessage("Unexpected error. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Set specific error message for 404
          setErrorMessage("Ticket not found.");
        } else {
          console.error("Error fetching ticket data:", error);
          setErrorMessage("Network error occurred. Please try again.");
        }
      }
    };

    fetchTicketData();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center">
      {errorMessage ? (
        <div className="flex justify-center items-center error-message w-[30vw] h-[80px] bg-red-500 rounded-md mt-5 mb-3 mx-auto">
          <h3 className="text-white text-xl font-medium">{errorMessage}</h3>
        </div>
      ) : (
        <div className="flex justify-center items-center w-[30vw] h-[80px] bg-gray-200 rounded-md mt-5 mb-3 mx-auto">
          <h3 className="text-black text-xl font-medium">{ticketData?.event_title}</h3>
        </div>
      )}

      {!errorMessage && ticketData && (
        <div className="mt-3">
          <QRCodeCanvas
            value={ticketData.ticket_code || ""}
            size={200}              // Size of the QR code
            bgColor={"#ffffff"}     // Background color
            fgColor={"#000000"}     // Foreground color
            level={"L"}             // Error correction level
          />
        </div>
      )}
    </div>
  );
};

export default Ticket;
