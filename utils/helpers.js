module.exports = {
  // Export a function named format_date.
  format_date: (date) => {
    // Create a new Date object from the input date.
    let formattedDate = new Date(date);

    // Return a formatted date string in the "MM/DD/YYYY" format.
    return `${
      formattedDate.getMonth() + 1
    }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },
};
