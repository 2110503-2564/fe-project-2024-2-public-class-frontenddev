import getUserProfile from "./getUserProfile";
import { getSession } from "next-auth/react";

export default async function createBooking(
    nameLastname: string,
    tel: string,
    bookDate: Date,
    campId: string
) {
    const session = await getSession();
    if (!session || !session.user.token) return null;
  
    const profile = await getUserProfile(session.user.token);
    const userId = profile.data._id;

    const response = await fetch(`https://camp-booking-app.vercel.app/api/v1/camps/${campId}/bookings`, {
    method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization' : `Bearer ${session.user.token}`
        },
        body: JSON.stringify({
            nameLastname: nameLastname,
            tel: tel,
            bookingDate: bookDate,
            user: userId,
            camp: campId
        })
    })

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return await response.json();
}