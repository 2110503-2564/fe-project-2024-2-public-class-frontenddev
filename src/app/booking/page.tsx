"use client";
import { useState, useEffect } from "react";
import LocationDateReserve from "@/components/DateReserve";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
  const urlParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const cid = urlParams.get("cid");
  
  const [bookingData, setBookingData] = useState({
    nameLastname: "",
    tel: "",
    camp: cid || "",
    bookDate: "",
  });

  const handleFormDataChange = (data: Partial<BookingItem>) => {
    setBookingData(prev => ({
      ...prev,
      ...data
    }));
  };

  const makeBooking = () => {
    const campValue = bookingData.camp || cid || "";

    if (bookingData.nameLastname && bookingData.tel && campValue && bookingData.bookDate) {
    if (bookingData.nameLastname && bookingData.tel && campValue && bookingData.bookDate) {
      const newBooking: BookingItem = {
        nameLastname: bookingData.nameLastname,
        tel: bookingData.tel,
        camp: campValue,
        bookDate: bookingData.bookDate,
      };

      dispatch(addBooking(newBooking));

      // Reset form
      setBookingData({
        nameLastname: "",
        tel: "",
        camp: cid || "",
        bookDate: "",
      });
    } else {
      alert("Please fill in all required fields");
    }
  }
  };

  return (
    <main className="w-full max-w-lg mx-auto flex flex-col items-center space-y-6 text-black p-6 bg-white shadow-lg rounded-lg mt-4">
      <div className="text-xl font-semibold text-gray-800">
        Reserve Campground
      </div>

      <div className="w-full space-y-3 alignment-center">
        <div className="text-md text-left text-gray-600">Select your dates</div>
        <LocationDateReserve onChange={handleFormDataChange} />
      </div>

      <button
        name="Book Campground"
        onClick={ makeBooking }
        className="w-full max-w-xs rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-indigo-600 hover:to-sky-600 px-4 py-3 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
      >
        Book Campground
      </button>
    </main>
  );
}
