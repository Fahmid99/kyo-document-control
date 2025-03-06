import { useMemo } from "react";

// Custom hook to format dates
const useFormattedDate = (dateString: string): string => {
  return useMemo(() => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }, [dateString]); // Re-run only if dateString changes
};

export default useFormattedDate;
