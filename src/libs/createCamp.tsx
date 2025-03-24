export default async function createCamp(
    campName: string,
    campAddress: string,
    campDistrict: string,
    campProvince: string,
    campPostalcode: string,
    campTel: string,
    campRegion: string,
    campPicture: string,
    token: string
  ) {
    const response = await fetch(
      "https://camp-booking-app.vercel.app/api/v1/camps",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: campName,
          address: campAddress,
          district: campDistrict,
          province: campProvince,
          postalcode: campPostalcode,
          tel: campTel,
          region: campRegion,
          picture: campPicture,
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to create camp");
    }
  
    return await response.json();
  }
  