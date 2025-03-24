import { getSession } from "next-auth/react";

export default async function getBooking(id: string) {
    
    const session = await getSession();
    if (!session || !session.user.token) return null;

    const response = await fetch(`https://camp-booking-app.vercel.app/api/v1/bookings/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.token}`,
        }
    });

    if (!response.ok) {
    throw new Error("Failed to fetch booking");
    }

    return await response.json();
}

