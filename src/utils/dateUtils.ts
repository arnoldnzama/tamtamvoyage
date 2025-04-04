
export const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  
  // Use French locale by default, but this could be dynamic based on the selected language
  return new Intl.DateTimeFormat('fr-FR').format(date);
};

// Format date and time together
export const formatDateTime = (dateString: string | null, timeString: string | null) => {
  if (!dateString) return "-";
  
  const date = formatDate(dateString);
  return timeString ? `${date} à ${timeString}` : date;
};

// Calculate duration between two dates in days
export const calculateDuration = (startDate: string | null, endDate: string | null) => {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Format date range for display
export const formatDateRange = (fromDate: Date | null | undefined, toDate: Date | null | undefined) => {
  if (!fromDate) return "-";
  
  if (!toDate) {
    return formatDate(fromDate.toISOString());
  }
  
  return `${formatDate(fromDate.toISOString())} - ${formatDate(toDate.toISOString())}`;
};

// Check if a date is within a range
export const isDateInRange = (date: Date, fromDate: Date | null | undefined, toDate: Date | null | undefined) => {
  if (!fromDate) return true;
  
  const timestamp = date.getTime();
  const fromTimestamp = fromDate.getTime();
  
  if (!toDate) {
    return timestamp >= fromTimestamp;
  }
  
  const toTimestamp = toDate.getTime();
  return timestamp >= fromTimestamp && timestamp <= toTimestamp;
};
