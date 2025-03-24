"use client";

import React, { useState } from "react";
import userRegister from "@/libs/userRegister";
import Link from "next/link";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    role: "user",
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
      const response = await userRegister(
        formData.name,
        formData.email,
        formData.tel,
        formData.password,
      );
      setSuccess("Registration successful!");
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center absolute justify-center bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto top-20 left-0 right-0">
      <h1 className="text-2xl font-bold mb-4  text-green-900">Register</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <table className="w-full border-collapse border-none text-black">
          <tbody>
            <tr>
              <td className="p-2 text-black">Name:</td>
              <td className="p-2">
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-md bg-gray-100" />
              </td>
            </tr>
            
            <tr>
              <td className="p-2 text-black">Email:</td>
              <td className="p-2">
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded-md bg-gray-100" />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Telephone:</td>
              <td className="p-2">
              <input type="tel" name="tel" value={formData.tel} onChange={handleChange} required className="w-full p-2 border rounded-md bg-gray-100" />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Password:</td>
              <td className="p-2">
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded-md bg-gray-100" />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Register</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <div><p className="text-green-500">{success}</p> <Link href="/api/auth/signin">Please sign in - Click here</Link></div>}
    </div>
  );
};

export default RegisterPage;