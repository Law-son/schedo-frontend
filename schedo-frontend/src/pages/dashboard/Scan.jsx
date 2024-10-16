import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const Scan = () => {
  const [data, setData] = useState('No result');
  const [scanning, setScanning] = useState(true);

  const handleScan = (result) => {
    if (result && result.text) { // Check if result has text property
      setData(result.text); // Set data to the text property of the result object
      setScanning(false); // Stop scanning after a successful scan
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleRestart = () => {
    setScanning(true); // Restart scanning
    setData('No result');
  };

  return (
    <div>
      {scanning ? (
        <div>
          <h2>QR Code Scanner</h2> {/* Optional title for clarity */}
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%', border: '2px solid #000', borderRadius: '8px' }}
          />
          <p style={{ textAlign: 'center' }}>
            Scanning... Please point your camera at a QR code.
          </p>
          <button 
            onClick={() => setScanning(false)} 
            style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Stop Scanning
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h3>Scan Result:</h3>
          <p>{data}</p>
          <button 
            onClick={handleRestart} 
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} // Darker blue on hover
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'} // Reset on mouse out
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Scan;
