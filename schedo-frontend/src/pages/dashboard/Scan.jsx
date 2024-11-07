import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

const Scan = () => {
  const [data, setData] = useState("No result");
  const [scanning, setScanning] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [scannedOnce, setScannedOnce] = useState(false);

  const handleScan = async (result) => {
    if (result && result.text && !scannedOnce) {
      setData(result.text);
      setScanning(false);
      setScannedOnce(true); // Prevent further scans until reset

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/registrations/ticket/scan/${result.text}/`
        );
        const status = response.data.status;

        if (status === "Registered") {
          setSnackbarSeverity("success");
          setSnackbarMessage("User is registered and has a valid ticket!");
        } else if (status === "Ticket used") {
          setSnackbarSeverity("warning");
          setSnackbarMessage("This ticket has already been used.");
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("User is not registered.");
        }
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to verify ticket. Please try again.");
      } finally {
        setOpen(true);
        // Reset scanning after a short delay to allow new scans
        setTimeout(() => setScannedOnce(false), 5000); // 5-second debounce to avoid duplicate requests
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleRestart = () => {
    setScanning(true);
    setData("No result");
    setScannedOnce(false); // Allow scanning again
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {scanning ? (
        <div>
          <h2>QR Code Scanner</h2>
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{
              width: "100%",
              border: "2px solid #000",
              borderRadius: "8px",
            }}
          />
          <p style={{ textAlign: "center" }}>
            Scanning... Please point your camera at a QR code.
          </p>
          <button
            onClick={() => setScanning(false)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Stop Scanning
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>Scan Result:</h3>
          <p>{data}</p>
          <button
            onClick={handleRestart}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Scan Again
          </button>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Scan;
