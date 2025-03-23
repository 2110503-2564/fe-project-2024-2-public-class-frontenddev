export default async function getCamps() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(
      "https://camp-booking-app.vercel.app/api/v1/camps"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch camps");
    }
  
    return await response.json();
  }