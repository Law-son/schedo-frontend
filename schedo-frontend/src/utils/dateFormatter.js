// dateFormatter.js
export const formatDate = (dateString) => {
    // Create a new Date object from the input string
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date)) {
      throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
    }
  
    // Define options for formatting
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    // Format the date using toLocaleDateString
    return date.toLocaleDateString('en-US', options);
  };
  