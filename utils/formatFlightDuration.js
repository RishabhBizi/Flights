export function formatFlightDuration(duration) {
    // Extract hours and minutes using regex
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
  
    const hours = hoursMatch ? `${hoursMatch[1]}H` : '';
    const minutes = minutesMatch ? `${minutesMatch[1]}m` : '';
  
    return `${hours} ${minutes}`.trim();
  }
export function formatFlightDurationV2(arrivalTime,departureTime) {
  const arrivateTimeDate = new Date(arrivalTime);
  const departureTimeDate = new Date(departureTime);
  const timeDifference = arrivateTimeDate - departureTimeDate; // Difference in milliseconds

// Convert milliseconds to hours and minutes
const hours = Math.floor(timeDifference / (1000 * 60 * 60));
const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
return `${hours}H ${minutes}m`
}