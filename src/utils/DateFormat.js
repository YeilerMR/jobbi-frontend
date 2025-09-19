export const formatDate = (date) => { // Input: Wed Sep 18 2025
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`; // Output: YYYY-MM-DD
};