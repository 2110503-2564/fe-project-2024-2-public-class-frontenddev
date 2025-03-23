export default async function getCamp(id: string) {
    const response = await fetch(
      `https://camp-booking-app.vercel.app/api/v1/camps/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch camp");
    }
  
    return await response.json();
  }