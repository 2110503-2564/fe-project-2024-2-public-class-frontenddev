export default async function getBookings(role: string) {

  if(role !== "admin") {
    throw new Error("You aren't authorized to access this page");
  }

  const response = await fetch('https://camp-booking-app.vercel.app/api/v1/bookings');

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return await response.json();
}

