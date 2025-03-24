import { getSession } from "next-auth/react";
import getUserProfile from "./getUserProfile";

export default async function updateBooking(id: string,
    {nameLastname, tel, camp, bookDate} : {nameLastname: string, tel: string, camp: string, bookDate: Date}) {

    const session = await getSession();
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    const userId = profile.data._id;

    const response = await fetch(`https://camp-booking-app.vercel.app/api/v1/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({
            nameLastname: nameLastname,
            tel: tel,
            bookingDate: bookDate,
            user: userId,
            camp: camp
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update booking");
    }

    return await response.json();
}