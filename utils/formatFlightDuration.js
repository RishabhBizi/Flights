export function formatFlightDuration(duration) {
    // Extract hours and minutes using regex
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
  
    const hours = hoursMatch ? `${hoursMatch[1]}H` : '';
    const minutes = minutesMatch ? `${minutesMatch[1]}m` : '';
  
    return `${hours} ${minutes}`.trim();
  }