import { getSession } from "next-auth/react";

export default async function getBookings() {

  const session = await getSession();
  if (!session || !session.user.token) return null;
  
  const response = await fetch('https://camp-booking-app.vercel.app/api/v1/bookings', {
    headers: {
      authorization: `Bearer ${session.user.token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return await response.json();
}

