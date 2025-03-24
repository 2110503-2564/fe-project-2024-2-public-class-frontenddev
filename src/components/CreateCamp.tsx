"use client";
import createCamp from "@/libs/createCamp";
import React, { useState } from "react";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default function CreateCamp({token}:{token: string}) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    district: "",
    province: "",
    postalcode: "",
    tel: "",
    region: "",
    picture: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await createCamp(
        formData.name,
        formData.address,
        formData.district,
        formData.province,
        formData.postalcode,
        formData.tel,
        formData.region,
        formData.picture,
        token
      );
      alert("create camp success");
    } catch (err) {
      setError("Failed to create camp. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto top-20 left-0 right-0">
      <form onSubmit={handleSubmit} className="w-full">
        <table className="w-full border-collapse border-none text-black">
          <tbody>
            <tr>
              <td className="p-2 text-black">Name:</td>
              <td className="p-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>

            <tr>
              <td className="p-2 text-black">Address:</td>
              <td className="p-2">
                <input
                  type="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">District:</td>
              <td className="p-2">
                <input
                  type="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Province:</td>
              <td className="p-2">
                <input
                  type="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Postalcode:</td>
              <td className="p-2">
                <input
                  type="postalcode"
                  name="postalcode"
                  value={formData.postalcode}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Telephone:</td>
              <td className="p-2">
                <input
                  type="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Region:</td>
              <td className="p-2">
                <input
                  type="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Picture:</td>
              <td className="p-2">
                <input
                  type="picture"
                  name="picture"
                  value={formData.picture}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Create Camp
        </button>
      </form>
    </div>
  );
}
