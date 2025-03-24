export default async function getBookings(token: string) {
  
  const response = await fetch('https://camp-booking-app.vercel.app/api/v1/bookings', {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return await response.json();
}

