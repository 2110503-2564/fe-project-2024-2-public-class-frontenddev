export default async function getBooking(token: string, id: string) {

  const response = await fetch(`https://camp-booking-app.vercel.app/api/v1/bookings/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }

  return await response.json();
}

